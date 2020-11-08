import { getNoEmptyStr, validePassword } from '../../../utils/data.helper';

export default (intl, form) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    const { getFieldValue } = form;
    return {
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
    };
};
