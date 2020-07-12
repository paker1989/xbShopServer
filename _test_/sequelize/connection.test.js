// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql',
// });
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (err) {
    console.log(err);
}

