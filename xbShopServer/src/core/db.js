const { Sequelize } = require('sequelize');
const config = require('../config/config');

const { dialect, host, port, user, password, dbName } = config.database;
const sequelize = new Sequelize(dbName, user, password, {
    host,
    dialect,
    port,
    define: {
        timestamps: true,
    },
});

sequelize.sync({ force: false });

module.exports = {
    sequelize,
};
