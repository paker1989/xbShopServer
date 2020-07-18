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
     * @param {*} requestBody
     */
    static async update(requestBody) {
        const { categoryName, idCategory, isActive, isDeleted } = requestBody;
        let updated;
        try {
            updated = sequelize.transaction(async (t) => {
                if (idCategory <= 0) {
                    // create case
                    const tmp = await CategoryModel.create(
                        {
                            label: categoryName,
                            isActive,
                        },
                        { transaction: t }
                    );
                    return tmp.toJSON();
                } else if (isDeleted === 1) {
                    // console.log('is deleted case');
                    // delete case
                    const nbDeleted = await CategoryModel.update(
                        {
                            isDeleted,
                        },
                        {
                            where: { idCategory, isDeleted: 0 },
                            transaction: t,
                        }
                    );
                    return { nbDeleted };
                } else {
                    // update case
                    const nbUpdated = await CategoryModel.update(
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
                    return { nbUpdated };
                }
            });
        } catch (err) {
            throw new HttpException(err.message);
        }
        return updated;
    }
}

module.exports = CategoryDAO;
