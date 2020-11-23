// import { getNoEmptyStr, validateEmail, validePassword } from '../../../utils/data.helper';

export default ({ intl }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    // const { isFieldTouched } = form;

    return {
        recipient: {
            rules: [{ required: true, message: _translate('customer.addAddress.error.noRecipient') }],
        },
        phone: {
            // rules: [{ required: true, message: _translate('customer.addAddress.error.noPhone') }],
        },
        addr1: {
            rules: [{ required: true, message: _translate('customer.addAddress.error.noAddr1') }],
        },
        addr2: {},
        city: {
            rules: [{ required: true, message: _translate('customer.addAddress.error.noCity') }],
        },
        postCode: {
            rules: [
                { required: true, message: _translate('customer.addAddress.error.noPostcode') },
                // { type: 'number', message: _translate('customer.addAddress.error.postCodeType') },
            ],
        },
        department: {},
        region: {},
        country: {
            rules: [{ required: true, message: _translate('customer.addAddress.error.noCountry') }],
        },
        instruction: {},
        default: {
            valuePropName: 'checked',
        },
        // getTouchedFields: (values) => {
        //     return Object.keys(values)
        //         .filter((key) => isFieldTouched(key))
        //         .reduce((obj, key) => {
        //             /* eslint-disable */
        //             obj[key] = values[key];
        //             /* eslint-enable */
        //             return obj;
        //         }, {});
        // },
    };
};
