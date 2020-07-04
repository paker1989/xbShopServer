import * as CategoryActionType from '../actionType/categoryActionType';

export const getCategories = (options) => ({
    type: CategoryActionType._GET_CATEGORIES,
    payload: options,
});

export const updateCategories = (options) => ({
    type: CategoryActionType._UPDATE_CATEGORIES,
    payload: options,
});
