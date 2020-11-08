import products from './products';
import commons from './commons';
import menus from './menu';
import categories from './category';
import users from './user';
import auth from './auth';
import customer from './customer';

const fr = { ...products, ...commons, ...menus, ...categories, ...users, ...auth, ...customer };

export default fr;
