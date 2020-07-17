import * as CategoryActionType from '../actionType/categoryActionType';

export const getCategories = (options) => ({
    type: CategoryActionType._GET_CATEGORIES,
    payload: options,
});

export const updateCategories = (options) => ({
    type: CategoryActionType._UPDATE_CATEGORIES,
    payload: options,
});

export const cancelEditCategories = () => ({
    type: CategoryActionType._CANCEL_EDIT_CATEGORY,
    payload: {
        idCat: -1,
        name: '',
        isActive: true,
        parentId: -1,
        backendMsg: '',
        backendStatus: '',
    },
});
