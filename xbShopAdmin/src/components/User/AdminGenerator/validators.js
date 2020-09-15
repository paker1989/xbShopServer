// import { productGenerator } from '../../../static/data/componentMeta/product/addProductMeta';
import { getNoEmptyStr, validateEmail, validePassword } from '../../../utils/data.helper';

export default ({ intl, form }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    const { getFieldValue } = form;

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
                        const loginOpt = getFieldValue('pa');
                        const wrappedVal = getNoEmptyStr(value);

                        if (wrappedVal.length < 1) {
                            callback(_translate('user.addAdmin.error.noPwd'));
                        } else {
                            callback(!validePassword(wrappedVal));
                        }
                    },
                },
            ],
        },
        passwordRepeat: {
            rules: [{ required: true, message: _translate('user.addAdmin.error.noPwdRepeat') }],
        },
    };
};
