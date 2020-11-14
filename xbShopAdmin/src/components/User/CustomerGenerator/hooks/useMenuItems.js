import * as CustomerMeta from '../../../../static/data/componentMeta/user/addCustomerMeta';

const { defaultMenus } = CustomerMeta.global;

const userMenuItems = (idCustomer) => {
    const menuItems = defaultMenus.slice(0);
    let disabledItems;

    if (idCustomer === -1) {
        disabledItems = menuItems.filter((item) => item !== 'basic');
    } else {
        disabledItems = [];
    }
    return [menuItems, disabledItems];
};

export default userMenuItems;
