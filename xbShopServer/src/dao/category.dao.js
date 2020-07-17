const CategoryModel = require('../model/category');
const { category } = require('../core/cache/cachePrefix');
const { redisClient } = require('../core/cache/redis');
const { async, getCacheKey } = require('../core/cache/redisHelper');
const { sequelize } = require('../core/db');
const { HttpException } = require('../core/httpException');

const { zRangeAsync } = async;
const { prefix, keys } = category;

class CategoryDAO {
    static async getList() {
        const cacheKey = getCacheKey(prefix, keys.list);
        //   first, check from redis
        const reply = await zRangeAsync.call(redisClient, cacheKey, 0, -1);
        if (reply && reply.length > 0) {
            console.log('hit cache');
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
        let updated;
        try {
            updated = sequelize.transaction(async (t) => {
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
                    category = await CategoryModel.update(
                        {
                            label: categoryName,
                            isActive,
                            isDeleted,
                        },
                        {
                            where: { idCategory },
                            transaction: t,
                        }
                    );
                }
                return category.toJSON();
            });
        } catch (err) {
            throw new HttpException(err.message);
        }
        return updated;
    }
}

module.exports = CategoryDAO;
