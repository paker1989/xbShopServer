import products from './products';
import commons from './commons';
import menus from './menu';
import categories from './category';

const fr = { ...products, ...commons, ...menus, ...categories };

export default fr;
