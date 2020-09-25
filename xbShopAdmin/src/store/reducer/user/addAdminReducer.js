/**
 * add admin form
 */
import * as userActionType from '../../actionType/userActionType';

const formInitialState = {
    idAdmin: -1,
    idRole: -1,
    isActive: true,
    phoneNumber: '',
    email: '',
    defaultPage: '',
    password: '',
    passwordRepeat: '',
};

const initialState = {
    ...formInitialState,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActionType._USER_ADMIN_RESET_STATES:
            return { ...state, ...formInitialState };
        default:
            return state;
    }
};
