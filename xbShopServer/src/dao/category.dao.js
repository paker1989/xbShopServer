const CategoryModel = require('../model/category');
const { redisClient, zRangeAsync } = require('../core/redis');
const { sequelize } = require('../core/db');
const { HttpException } = require('../core/httpException');

const cachePrefix = 'category';

class CategoryDAO {
    static getKey(type) {
        return `${cachePrefix}-${type}`;
    }

    static async getList() {
        const cacheKey = CategoryDAO.getKey('list');
        // let score = 0;
        //   first, check from redis
        const reply = await zRangeAsync.call(redisClient, cacheKey, 0, -1);
        if (reply && reply.length > 0) {
            return {
                cnt: reply.length,
                res: reply.map((str) => JSON.parse(str)),
            };
        }

        const { rows, count } = await CategoryModel.findAndCountAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
            where: {
                isDeleted: 0,
            },
            order: ['idCategory'],
        });

        const inserts = rows
            .map((item) => item.toJSON())
            .map((item) => ['zadd', cacheKey, item.idCategory, JSON.stringify(item)]);

        return new Promise((resolve) => {
            redisClient.multi(inserts).exec(() => {
                resolve({
                    cnt: count,
                    res: rows.map((item) => item.toJSON()),
                });
            });
        });
    }

    /**
     * update category in db only
     * @param {*} category
     */
    static async update(requestBody) {
        const { categoryName, idCategory, isActive, isDeleted } = requestBody;
        const updated = sequelize.transaction(async (t) => {
            let category;
            if (idCategory <= 0) {
                category = await CategoryModel.create(
                    {
                        label: categoryName,
                        isActive,
                    },
                    { transaction: t }
                );
            } else {
                // category = await CategoryModel.update(
                //     {
                //         label: categoryName,
                //         isActive,
                //         isDeleted,
                //     },
                //     {
                //         where: { idCategory },
                //         transaction: t,
                //     }
                // );
                const toUpdate = await CategoryModel.findByPk(idCategory, {
                    attributes: { exclude: ['createAt', 'updateAt'] },
                });
                if (toUpdate) {
                    toUpdate.categoryName = categoryName;
                    toUpdate.isActive = isActive;
                    toUpdate.isDeleted = isDeleted;
                    const validateResult = await toUpdate.validate();
                    if (validateResult === null) {
                        console.log('save it');
                        category = await toUpdate.save();
                    } else {
                        console.log(validateResult);
                        throw new HttpException(validateResult.msg);
                    }
                }
            }
            console.log(category.toJSON());
            return category.toJSON();
        });

        return updated;
    }
}

module.exports = CategoryDAO;
