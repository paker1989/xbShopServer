/**
 * add admin form
 */
import * as userActionType from '../../actionType/userActionType';

// const formInitialState = {
//     idAdmin: -1,
//     idRole: undefined,
//     isActive: true,
//     phoneNumber: '',
//     email: '',
//     defaultPage: undefined,
//     password: '',
//     passwordRepeat: '',
// };

const formInitialState = {
    idAdmin: -1,
    idRole: 1,
    isActive: true,
    phoneNumber: '+33659657708',
    email: 'xubinqz@gmail.com',
    defaultPage: 1,
    password: '0659657708',
    passwordRepeat: '0659657708',
};

const initialState = {
    ...formInitialState,
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActionType._USER_ADMIN_RESET_STATES:
            return { ...state, ...formInitialState };
        case userActionType._USER_ADMIN_UPDATE_SUCCESS:
            return { ...state, ...action.payload };
        case userActionType._USER_ADMIN_UPDATE_FAILED:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
