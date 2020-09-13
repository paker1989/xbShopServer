// import { productGenerator } from '../../../static/data/componentMeta/product/addProductMeta';
import { getNoEmptyStr, validateEmail, validePassword } from '../../../utils/data.helper';

export default ({ intl }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    return {
        idRole: {
            rules: [{ required: true, message: _translate('user.addAdmin.error.noRole') }],
        },
        isActive: {
            valuePropName: 'checked',
            initialValue: true,
        },
        phoneNumber: {},
        password: {
            valuePropName: 'pwd',
        },
        email: {
            rules: [
                { required: true, message: _translate('user.addAdmin.error.noEmail') },
                {
                    validator: (rule, value, callback) => {
                        const wrappedVal = getNoEmptyStr(value);
                        if (!validateEmail(wrappedVal)) {
                            callback(_translate('user.addAdmin.error.formatEmail'));
                        } else {
                            callback();
                        }
                    },
                },
            ],
        },
        password: {
            rules: [
                {
                    validator: (rule, value, callback) => {
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
    };
};
