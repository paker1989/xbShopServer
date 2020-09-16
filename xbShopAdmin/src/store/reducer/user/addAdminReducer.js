/**
 * add product form
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

// const formInitialState = {
//     idAdmin: -1,
//     idRole: 2,
//     isActive: false,
//     phoneNumber: '0659657708',
//     email: 'xubinqz@gmail.com',
//     defaultPage: 'user list',
//     password: '1235',
//     passwordRepeat: '5231',
// };

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
