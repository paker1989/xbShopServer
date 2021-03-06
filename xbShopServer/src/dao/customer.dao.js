const { fn, col, where, Op } = require('sequelize');

const CustomerModel = require('../model/customer/customer');
const AddressModel = require('../model/customer/address');
const RegionModel = require('../model/customer/region');
const DepartmentModel = require('../model/customer/department');
const CityModel = require('../model/customer/city');

const { sequelize } = require('../core/db');
const encryptHelper = require('../core/encryptionHelper');
const ErrorTypes = require('../core/type/customerType');
const { getFilters } = require('../core/dateHelper');

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
        // if (id !== -1) {
        //     // return { [ErrorTypes._BAD_ID_FOR_CREATE]: true };
        //     return ErrorTypes._BAD_ID_FOR_CREATE;
        // }
        // if (typeof email === 'undefined') {
        //     // return { [ErrorTypes._EMAIL_UNDEFINED]: true };
        //     return ErrorTypes._EMAIL_UNDEFINED;
        // }
        // if (typeof pseudo === 'undefined') {
        //     // return { [ErrorTypes._PSEUDO_UNDEFINED]: true };
        //     return ErrorTypes._PSEUDO_UNDEFINED;
        // }
        if (!email && !pseudo) {
            return error;
        }
        let whereCondition;
        if (typeof email !== 'undefined' && typeof pseudo !== 'undefined') {
            whereCondition = {
                [Op.or]: [
                    { $col: where(fn('lower', col('email')), fn('lower', email)) },
                    { $col: where(fn('lower', col('pseudo')), fn('lower', pseudo)) },
                ],
            };
        } else if (typeof email !== 'undefined') {
            whereCondition = { $col: where(fn('lower', col('email')), fn('lower', email)) };
        } else {
            whereCondition = { $col: where(fn('lower', col('pseudo')), fn('lower', pseudo)) };
        }

        const duplicas = await CustomerModel.findAll({
            where: {
                ...whereCondition,
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
        const customer = await CustomerModel.findByPk(idCustomer, {
            include: [
                {
                    model: AddressModel,
                    as: 'addresses',
                },
            ],
        });
        return customer ? customer.toJSON() : null;
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
            thumbnail,
            gender,
            idCustomer,
            isActive,
            isDeleted = false,
            password,
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
                    await CustomerDAO.saveAddress(address); // to test
                }

                return newCustomer.idCustomer;
            });
        } else if (action) {
            if (action === 'delete') {
                const [updatedRow] = await CustomerModel.update(
                    {
                        isDeleted: true,
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
                const { idCustomer: _idCustomer, action: _action, ...updateProps } = ctxBody;

                await CustomerModel.update(updateProps, {
                    where: { idCustomer: idCustomerInt },
                });
                pk = idCustomerInt;
            }
        }

        if (pk) {
            return CustomerDAO.findCustomerByPk(pk);
        }
        return pk; // undefined
    }

    static async getDepartmByCountry(countryCode) {
        const allDepartments = (
            await DepartmentModel.findAll({
                include: [
                    {
                        model: RegionModel,
                        as: 'region',
                        where: {
                            country: countryCode,
                        },
                    },
                ],
            })
        ).map((item) => ({
            text: item.displayName,
            name: item.pureName,
            value: item.id,
        }));
        return allDepartments;
    }

    static async getCitiesByCountry(countryCode) {
        const allCities = (
            await CityModel.findAll({
                include: [
                    {
                        model: DepartmentModel,
                        as: 'department',
                        include: [
                            {
                                model: RegionModel,
                                where: {
                                    country: countryCode,
                                },
                            },
                        ],
                    },
                ],
            })
        ).map((item) => ({
            text: item.displayName,
            value: item.id,
            name: item.name,
            postCode: item.zipCode,
            department: item.department.pureName,
        }));
        return allCities;
    }

    /**
     * save or update a customer
     * @param {*} ctxBody
     */
    static async saveAddress(ctxBody) {
        let pk;
        const {
            addr1,
            addr2,
            city,
            instruction = '',
            phone = '',
            postCode,
            countryCode,
            region,
            recipient,
            isDefault,
            addressId = -1,
            customerId = -1,
            isDeleted = false,
            action,
        } = ctxBody;

        const idAddressInt = parseInt(addressId, 10);
        const idCustomerInt = parseInt(customerId, 10);

        // create case
        if (idAddressInt === -1) {
            const customer = await CustomerDAO.findCustomerByPk(idCustomerInt);
            if (customer) {
                const _isDefault = isDefault || (customer.addresses && customer.addresses.length === 0);
                const newAddress = await AddressModel.create({
                    addr1,
                    addr2,
                    city,
                    instruction,
                    phone,
                    postCode,
                    region,
                    recipient,
                    countryCode,
                    isDefault: _isDefault,
                    customerId: idCustomerInt,
                });
                return newAddress.toJSON();
            }
            return undefined;
        }

        if (action === 'setDefault') {
            await sequelize.transaction(async (t) => {
                const [nbUpdated] = await AddressModel.update(
                    {
                        isDefault: true,
                    },
                    {
                        where: { idAddress: idAddressInt },
                        transaction: t,
                    }
                );
                if (nbUpdated === 1) {
                    await AddressModel.update(
                        {
                            isDefault: false,
                        },
                        {
                            where: {
                                idAddress: {
                                    [Op.not]: idAddressInt,
                                },
                                customerId: idCustomerInt,
                            },
                            transaction: t,
                        }
                    );
                }
            });
            return { idAddress: idAddressInt, customerId };
        }

        if (action === 'delete') {
            // delete case
            const [nbDeleted] = await AddressModel.update(
                {
                    isDeleted: 1,
                },
                {
                    where: { idAddress: idAddressInt },
                }
            );
            return { nbDeleted, idAddress: idAddressInt, customerId };
        }

        const { customerId: _customerId, addressId: _addressId, action: _action, ...fieldProps } = ctxBody;
        console.log(fieldProps);
        const [updatedRow] = await AddressModel.update({ ...fieldProps }, { where: { idAddress: _addressId } });
        // console.log(updatedRow);
        // console.log(addresses);
        if (updatedRow > 0) {
            const updated = await CustomerDAO.getAddress(_customerId, _addressId);
            return updated;
        }

        // else if (action) {
        //     if (action === 'delete' || action === 'restore') {
        //         const [updatedRow] = await CustomerModel.update(
        //             {
        //                 isDeleted: action === 'delete',
        //             },
        //             {
        //                 where: { idCustomer: idAddressInt },
        //             }
        //         );

        //         if (updatedRow === 1) {
        //             pk = idAddressInt;
        //         }
        //     }

        //     if (action === 'update') {
        //         const updateCondition = {};
        //         const prefUpdateCondition = {};
        //         if (email) {
        //             updateCondition.email = email;
        //         }
        //         if (typeof isActive !== 'undefined') {
        //             updateCondition.isActive = isActive;
        //         }
        //         if (phone) {
        //             updateCondition.phone = phone;
        //         }
        //         if (password) {
        //             updateCondition.password = encryptHelper.bcryptHashSync(password);
        //         }
        //         if (pseudo) {
        //             prefUpdateCondition.pseudo = parseInt(pseudo, 10);
        //         }
        //         if (thumbnail) {
        //             prefUpdateCondition.userAccessId = parseInt(thumbnail, 10);
        //         }

        //         pk = await sequelize.transaction(async (t) => {
        //             if (Object.keys(updateCondition).length > 0) {
        //                 await CustomerModel.update(updateCondition, {
        //                     where: { idCustomer: idAddressInt },
        //                     transaction: t,
        //                 });
        //             }
        //             return idAddressInt;
        //         });
        //     }
        // }

        // if (pk) {
        //     return CustomerDAO.findCustomerByPk(pk);
        // }
        return pk; // undefined
    }

    static async getAddress(customerId, addressId) {
        if (addressId) {
            const address = await AddressModel.findByPk(addressId);
            return address ? address.toJSON() : null;
        }
        const addresses = (
            await AddressModel.findAll({
                where: {
                    isDeleted: false,
                    customerId,
                },
            })
        ).map((item) => item.toJSON());
        return addresses;
    }

    static async getCustomerIds(ctxBody) {
        const { filter = 'NA', sort = 'NA', sortOrder = 'NA', searchStr = '' } = ctxBody;
        let orderStatement;
        if (sort === 'NA' || sortOrder === 'NA') {
            orderStatement = [];
        } else {
            orderStatement = [sort, sortOrder.toLowerCase() === 'desc' ? 'asc' : 'desc'];
        }

        const filterObj = getFilters(filter);
        const filterCondition = {};

        Object.keys(filterObj).forEach((key) => {
            if (key === 'isActive') {
                filterObj[key] = filterObj[key].map((val) => (val === 'true' ? 1 : 0));
            }
            filterCondition[key] = { [Op.in]: filterObj[key] };
        });

        if (searchStr.trim().length > 0) {
            filterCondition[Op.or] = {
                email: {
                    [Op.like]: `%${searchStr.trim()}%`,
                },
                pseudo: {
                    [Op.like]: `%${searchStr.trim()}%`,
                },
            };
        }

        const sortedIds = (
            await CustomerModel.findAll({
                attributes: ['idCustomer'],
                where: {
                    isDeleted: false,
                    ...filterCondition,
                },
                order: orderStatement.length === 0 ? [] : [orderStatement],
            })
        ).map((u) => u.get('idCustomer'));

        return sortedIds;
    }

    static async getCustomerMetas({ ids }) {
        if (ids.unshift) {
            const metas = await CustomerModel.findAll({
                where: {
                    idCustomer: { [Op.in]: ids },
                    isDeleted: false,
                },
            });
            return metas;
        }

        const meta = await CustomerModel.findByPk(ids, {
            where: {
                isDeleted: false,
            },
        });
        return meta;
    }
}

module.exports = CustomerDAO;
