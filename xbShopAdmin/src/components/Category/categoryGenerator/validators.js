export default ({ intl, categoryList, idCat }) => {
    function _translate(id, values = {}) {
        return intl.formatMessage({ id }, values);
    }

    return {
        categoryName: {
            rules: [
                { required: true, message: _translate('cat.add.error.empty.name') },
                {
                    validator: (rule, value, callback) => {
                        const duplica = categoryList.find(
                            (item) =>
                                item.label.trim().toLowerCase() === value.trim().toLowerCase() &&
                                item.idCategory !== Number.parseInt(idCat, 10)
                        );
                        if (duplica) {
                            callback(_translate('cat.add.error.duplica.name', { nb: 1 }));
                        } else {
                            callback();
                        }
                    },
                },
            ],
        },
        isActive: {
            valuePropName: 'checked',
        },
    };
};
