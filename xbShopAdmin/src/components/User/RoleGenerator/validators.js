// import { getNoEmptyStr, validateEmail, validePassword } from '../../../utils/data.helper';

export default ({ intl, form }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    const { isFieldTouched } = form;

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
        getTouchedFields: (values) => {
            return Object.keys(values)
                .filter((key) => isFieldTouched(key))
                .reduce((obj, key) => {
                    /* eslint-disable */
                    obj[key] = values[key];
                     /* eslint-enable */
                    return obj;
                }, {});
        },
    };
};
