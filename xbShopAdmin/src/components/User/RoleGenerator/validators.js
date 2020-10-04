// import { getNoEmptyStr, validateEmail, validePassword } from '../../../utils/data.helper';

export default ({ intl, form }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    const { getFieldValue } = form;

    return {
        roleName: {
            rules: [{ required: true, message: _translate('user.addRole.error.noName') }],
        },
        accesses: {
            rules: [
                { type: 'array' },
                {
                    validator: (rule, value, callback) => {
                        if (value.length < 1) {
                            callback(_translate('user.addRole.error.access'));
                        } else {
                            callback();
                        }
                    },
                },
            ],
        },
    };
};
