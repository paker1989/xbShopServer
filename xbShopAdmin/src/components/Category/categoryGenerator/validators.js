export default ({ intl }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    return {
        categoryName: {
            rules: [{ required: true, message: _translate('cat.add.error.empty.name') }],
        },
        isActive: {
            valuePropName: 'checked',
        },
    };
};
