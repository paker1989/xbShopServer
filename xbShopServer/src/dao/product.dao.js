const ProductModel = require('../model/product/product');
const { category } = require('../core/cache/cachePrefix');
const { redisClient } = require('../core/cache/redis');
const { async, getCacheKey } = require('../core/cache/redisHelper');
const { sequelize } = require('../core/db');
const { HttpException } = require('../core/httpException');

const { zRangeAsync } = async;
const { prefix, keys } = category;

class ProductDAO {
    static async update() {

    }
}

module.exports = ProductDAO;