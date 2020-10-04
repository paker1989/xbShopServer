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
        accesses: {},
    };
};
