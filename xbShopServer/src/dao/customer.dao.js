const { fn, col, where, Op } = require('sequelize');

const CustomerModel = require('../model/customer/customer');
const { sequelize } = require('../core/db');
const encryptHelper = require('../core/encryptionHelper');
const ErrorTypes = require('../core/type/customerType');

class CustomerDAO {
    /**
     * check if there is duplicate customer with same email or
     * @param {*} idCustomer
     * @param {*} email
     * @param {*} pseudo
     */
    static async checkDuplicaCustomer(idCustomer, email, pseudo) {
        let error = '';
        const id = parseInt(idCustomer, 10);
        if (id !== -1) {
            // return { [ErrorTypes._BAD_ID_FOR_CREATE]: true };
            return ErrorTypes._BAD_ID_FOR_CREATE;
        }
        if (typeof email === 'undefined') {
            // return { [ErrorTypes._EMAIL_UNDEFINED]: true };
            return ErrorTypes._EMAIL_UNDEFINED;
        }
        if (typeof pseudo === 'undefined') {
            // return { [ErrorTypes._PSEUDO_UNDEFINED]: true };
            return ErrorTypes._PSEUDO_UNDEFINED;
        }
        const duplicas = await CustomerModel.findAll({
            where: {
                [Op.or]: [
                    { $col: where(fn('lower', col('email')), fn('lower', email)) },
                    { $col: where(fn('lower', col('pseudo')), fn('lower', pseudo)) },
                ],
                idCustomer: {
                    [Op.not]: id,
                },
                isDeleted: false,
            },
        });
        duplicas.forEach((found) => {
            if (found.getDataValue('email').toLowerCase() === email) {
                // errors[ErrorTypes._EMAIL_DUPLICA] = true;
                error = ErrorTypes._EMAIL_DUPLICA;
            } else {
                // errors[ErrorTypes._PSEUDO_DUPLICA] = true;
                error = ErrorTypes._PSEUDO_DUPLICA;
            }
        });
        return error;
    }

    /**
     * @param {*} idCustomer
     * @param {*} options control the includes
     */
    static async findCustomerByPk(idCustomer, options = []) {
        const customer = await CustomerModel.findByPk(idCustomer, {});
        return customer.toJSON();
    }

    /**
     * save or update a customer
     * @param {*} ctxBody
     */
    static async saveCustomer(ctxBody) {
        let pk;
        const {
            pseudo,
            email,
            phone,
            thumbnail = '',
            gender,
            idCustomer,
            isActive = true,
            isDeleted = false,
            password = '',
            action,
            address,
        } = ctxBody;

        const idCustomerInt = parseInt(idCustomer, 10);

        // create case
        if (idCustomerInt === -1) {
            const encryptedPassword = encryptHelper.bcryptHashSync(password);
            pk = await sequelize.transaction(async (t) => {
                const newCustomer = await CustomerModel.create(
                    {
                        pseudo,
                        email,
                        gender,
                        password: encryptedPassword,
                        phone,
                        thumbnail,
                        isActive,
                        isDeleted,
                    },
                    {
                        transaction: t,
                    }
                );

                if (address && address.length > 0) {
                    // set address
                }

                return newCustomer.idCustomer;
            });
        } else if (action) {
            if (action === 'delete' || action === 'restore') {
                const [updatedRow] = await CustomerModel.update(
                    {
                        isDeleted: action === 'delete',
                    },
                    {
                        where: { idCustomer: idCustomerInt },
                    }
                );

                if (updatedRow === 1) {
                    pk = idCustomerInt;
                }
            }

            if (action === 'update') {
                const updateCondition = {};
                const prefUpdateCondition = {};
                if (email) {
                    updateCondition.email = email;
                }
                if (typeof isActive !== 'undefined') {
                    updateCondition.isActive = isActive;
                }
                if (phone) {
                    updateCondition.phone = phone;
                }
                if (password) {
                    updateCondition.password = encryptHelper.bcryptHashSync(password);
                }
                if (pseudo) {
                    prefUpdateCondition.pseudo = parseInt(pseudo, 10);
                }
                if (thumbnail) {
                    prefUpdateCondition.userAccessId = parseInt(thumbnail, 10);
                }

                pk = await sequelize.transaction(async (t) => {
                    if (Object.keys(updateCondition).length > 0) {
                        await CustomerModel.update(updateCondition, {
                            where: { idCustomer: idCustomerInt },
                            transaction: t,
                        });
                    }
                    return idCustomerInt;
                });
            }
        }

        if (pk) {
            return CustomerDAO.findCustomerByPk(pk);
        }
        return pk; // undefined
    }
}

module.exports = CustomerDAO;
