import { customerGenerator } from '../../../../static/data/componentMeta/user/addCustomerMeta';
import { getNoEmptyStr, validateEmail } from '../../../../utils/data.helper';

const { rules } = customerGenerator;

export default ({ intl, form }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    return {
        pseudo: {
            rules: [
                { required: true, message: _translate('user.customer.error.empty.pseudo') },
                { len: rules.pseudoMinLen, message: _translate('user.customer.error.minLen.pseudo') },
            ],
        },
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
        phoneNumber: {},
        gender: {},
        thumbnail: {},
    };
};
