const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../core/db');
const { category } = require('../core/cache/cachePrefix');
const { redisClient } = require('../core/cache/redis');
const { getCacheKey } = require('../core/cache/redisHelper');

const { prefix, keys } = category;

class Category extends Model {}

Category.init(
    {
        idCategory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        label: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        parentId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        tableName: 'category',
        modelName: 'category',
    }
);

Category.afterCreate((instance, options) => {
    if (options.transaction) {
        options.transaction.afterCommit(() => {
            redisClient.del(getCacheKey(prefix, keys.list));
        });
        return;
    }
});

Category.afterBulkUpdate((options) => {
    if (options.transaction) {
        options.transaction.afterCommit(() => {
            redisClient.del(getCacheKey(prefix, keys.list));
        });
        return;
    }
});

/**
 * ignore createdAt and updatedAt for toJSON
 */
Category.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());

    delete values.createdAt;
    delete values.updatedAt;
    return values;
};

module.exports = Category;
