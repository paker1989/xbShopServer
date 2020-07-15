import products from './products';
import commons from './commons';
import menus from './menu';
import categories from './category';
import users from './user';

const fr = { ...products, ...commons, ...menus, ...categories, ...users };

export default fr;
