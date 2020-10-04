/**
 * add product form
 */
import * as userActionType from '../../actionType/userActionType';
// import Axios from 'axios';
// import { getRequestUrl } from '../../../static/api';

// const allUserRoles = [];

// const getAllUserRoles = async () => {
//     const res = await Axios.post(getRequestUrl('auth', 'allUserRoles'), {}, { withCredentials: true });
//     console.log(res);
//     return res;
// };

// getAllUserRoles().then((res) => {
//     allUserRoles.push(...res.data);
// });

const initialState = {
    allUserRoles: [],
    allUserAccesses: [],
    allAdmins: [],
    activeTab: 'team', // team or role
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActionType._USER_ADMIN_PUT_ALL_USERROLES:
            return { ...state, ...action.payload };
        case userActionType._USER_ROLE_PUT_ALL_USERACCESSES:
            return { ...state, ...action.payload };
        case userActionType._USER_ADMIN_SET_TEAM_TAB:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
