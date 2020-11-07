const CustomerModel = require('../model/customer/customer');
const { customer: cache } = require('../core/cache/cachePrefix');
const { sequelize } = require('../core/db');
const encryptHelper = require('../core/encryptionHelper');

const { prefix, keys } = cache;

class CustomerDAO {
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
