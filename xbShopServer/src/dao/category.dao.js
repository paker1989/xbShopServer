const CategoryModel = require('../model/category');
const { redisClient, zRangeAsync } = require('../core/redis');

const cachePrefix = 'category';

class CategoryDAO {
    static getKey(type) {
        return `${cachePrefix}-${type}`;
    }

    static async getList() {
        const cacheKey = CategoryDAO.getKey('list');
        let score = 0;
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

        const inserts = rows.map((item) => ['zadd', cacheKey, ++score, JSON.stringify(item.toJSON())]);
        // console.log(inserts);
        return new Promise((resolve) => {
            redisClient.multi(inserts).exec(() => {
                resolve({
                    cnt: count,
                    res: rows.map((item) => item.toJSON()),
                });
            });
        });
    }
}

module.exports = CategoryDAO;
