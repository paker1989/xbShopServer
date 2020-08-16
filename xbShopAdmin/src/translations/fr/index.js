import products from './products';
import commons from './commons';
import menus from './menu';
import categories from './category';
import users from './user';
import auth from './auth';

const fr = { ...products, ...commons, ...menus, ...categories, ...users, ...auth };

export default fr;
