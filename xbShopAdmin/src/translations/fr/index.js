import products from './products';
import commons from './commons';
import menus from './menu';
import categories from './category';
import users from './user';
import auth from './auth';
import customer from './customer';
import country from './country';

const fr = { ...products, ...commons, ...menus, ...categories, ...users, ...auth, ...customer, ...country };

export default fr;
