import { getNoEmptyStr } from '../../utils/data.helper';

export default ({ intl, form }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    const { getFieldValue } = form;

    return {
        loginOpt: {
            initialValue: 'account', // account, mobile
        },
        username: {
            rules: [
                {
                    validator: (rule, value, callback) => {
                        const loginOpt = getFieldValue('loginOpt');
                        if (getNoEmptyStr(value).length === 0 && loginOpt === 'account') {
                            callback(_translate('auth.login.empty'));
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
                        const loginOpt = getFieldValue('loginOpt');
                        if (getNoEmptyStr(value).length === 0 && loginOpt === 'account') {
                            callback(_translate('auth.pwd.empty'));
                        } else {
                            callback();
                        }
                    },
                },
            ],
        },
        rememberMe: {
            valuePropName: 'checked',
            initialValue: true,
        },
    };
};
