import { getNoEmptyStr, validateEmail } from '../../../utils/data.helper';

export default ({ intl, form }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    const { isFieldTouched } = form;

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
