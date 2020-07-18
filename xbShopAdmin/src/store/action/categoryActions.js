import * as CategoryActionType from '../actionType/categoryActionType';

export const getCategories = (options) => ({
    type: CategoryActionType._GET_CATEGORIES,
    payload: options,
});

export const editCategory = (idCat) => ({
    type: CategoryActionType._EDIT_CATEGORY,
    payload: { idCat },
});

export const updateCategory = (options) => ({
    type: CategoryActionType._UPDATE_CATEGORY,
    payload: options,
});

export const cancelEditCategories = () => ({
    type: CategoryActionType._CANCEL_EDIT_CATEGORY,
    payload: {
        idCat: -1,
        name: '',
        isActive: true,
        parentId: -1,
        isDeleted: false,
    },
});

export const resetAddCategoryStatus = () => ({
    type: CategoryActionType._RESET_BACKEND_STATUS,
    payload: {
        backendMsg: '',
        backendStatus: '',
    },
});
