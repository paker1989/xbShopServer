// 引入bcrypt包
const bcrypt = require('bcryptjs');
const { auth } = require('../config/config');

function bcryptHashSync(myPlaintextPassword) {
    const { bcryptCost } = auth;
    const salt = bcrypt.genSaltSync(bcryptCost);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    return hash;
}

function comparePassword(myPlaintextPassword, dbHash) {
    return bcrypt.compareSync(myPlaintextPassword, dbHash);
}

module.exports = {
    bcryptHashSync,
    comparePassword,
};
