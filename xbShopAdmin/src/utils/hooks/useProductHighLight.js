// import React from 'react';
import { useSelector } from 'react-redux';
import { getPriceRange, getStockRange } from '../data.helper';
/**
 *
 * @param {*} useStore populate product from store
 * @param {*} product populate from given product arguement if useStore is `false`
 */
const useProductHL = (useStore, product) => {
    let productState;
    const categoryList = useSelector((state) => state.categoryReducer.categories);
    if (useStore) {
        productState = useSelector((state) => state.product.addProductReducer);
    } else {
        productState = product;
    }
    const { productName, shortDscp, isOffShelf, categories, specs, comment } = productState;
    return {
        productName,
        shortDscp,
        isOffShelf,
        categories: categoryList.filter((item) => Array.prototype.includes.call(categories, item.idCategory)),
        comment,
        priceRange: getPriceRange(specs.map((spec) => Number(spec.price))),
        stockRange: getStockRange(specs.map((spec) => Number(spec.stockNumber))),
        specs,
    };
};

export default useProductHL;
