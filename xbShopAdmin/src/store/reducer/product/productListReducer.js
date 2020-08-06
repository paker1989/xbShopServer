/**
 * add product form
 */
// import * as ProductActionType from '../../actionType/productActionType';

const initialState = {
    stockCreteria: '-1',
    soldCreteria: '-1',
    selectedProducts: [],
    fetchedProducts: [],
    totalCnt: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
