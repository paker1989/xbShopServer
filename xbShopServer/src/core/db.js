const { Sequelize } = require('sequelize');
const config = require('../config/config');

// need to comment for futur (maybe)
const usePassword = process.platform !== 'win32';

const { dialect, host, port, user, password, dbName } = config.database;
const sequelize = new Sequelize(dbName, user, usePassword ? password : '', {
    host,
    dialect,
    port,
    define: {
        timestamps: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    },
});

sequelize.sync({ force: false });

module.exports = {
    sequelize,
};
