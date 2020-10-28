// import { productGenerator } from '../../../static/data/componentMeta/product/addProductMeta';
import { getNoEmptyStr, validateEmail, validePassword } from '../../../utils/data.helper';

export default ({ intl, form }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    const { getFieldValue, isFieldTouched } = form;

    return {
        idRole: {
            rules: [{ required: true, message: _translate('user.addAdmin.error.noRole') }],
        },
        isActive: {
            valuePropName: 'checked',
            initialValue: true,
        },
        phoneNumber: {},
        email: {
            rules: [
                { required: true, message: _translate('user.addAdmin.error.noEmail') },
                {
                    validator: (rule, value, callback) => {
                        const wrappedVal = getNoEmptyStr(value);
                        if (wrappedVal.length > 0 && !validateEmail(wrappedVal)) {
                            callback(_translate('user.addAdmin.error.formatEmail'));
                        } else {
                            callback();
                        }
                    },
                },
            ],
        },
        defaultPage: {
            rules: [{ required: true, message: _translate('user.addAdmin.error.noDefaultPage') }],
        },
        password: {
            rules: [
                {
                    validator: (rule, value, callback) => {
                        const pwdRepeat = getNoEmptyStr(getFieldValue('passwordRepeat'));
                        const wrappedVal = getNoEmptyStr(value);

                        if (wrappedVal.length < 1) {
                            callback(_translate('user.addAdmin.error.noPwd'));
                        } else if (pwdRepeat.length > 0 && pwdRepeat !== wrappedVal) {
                            callback(_translate('user.addAdmin.error.pwd.match'));
                        } else {
                            const error = validePassword(wrappedVal);
                            if (error.length > 0) {
                                callback(_translate(error));
                            }
                        }
                        callback();
                    },
                },
            ],
        },
        passwordRepeat: {
            rules: [
                { required: true, message: _translate('user.addAdmin.error.noPwdRepeat') },
                {
                    validator: (rule, value, callback) => {
                        const pwdRepeat = getNoEmptyStr(getFieldValue('password'));
                        const wrappedVal = getNoEmptyStr(value);
                        if (wrappedVal.length === 0) {
                            callback();
                        } else if (pwdRepeat.length > 0) {
                            form.validateFields(['password'], () => {
                                callback();
                            });
                        }
                        callback();
                    },
                },
            ],
        },
        getTouchedFields: (values, passwordMode) => {
            return Object.keys(values)
                .filter((key) => {
                    if (passwordMode === 'edit' && key === 'password') {
                        return true;
                    }
                    if (passwordMode === 'standBy' && key === 'password') {
                        return false;
                    }
                    return isFieldTouched(key);
                })
                .reduce((obj, key) => {
                    /* eslint-disable */
                    obj[key] = values[key];
                    /* eslint-enable */
                    return obj;
                }, {});
        },
    };
};
