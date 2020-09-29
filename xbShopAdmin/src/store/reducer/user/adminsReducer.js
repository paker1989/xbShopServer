/**
 * add product form
 */
// import * as userActionType from '../../actionType/userActionType';
import Axios from 'axios';
import { getRequestUrl } from '../../../static/api';

const allUserRoles = [];

const getAllUserRoles = async () => {
    const res = await Axios.post(getRequestUrl('auth', 'allUserRoles'));
    return res;
};

getAllUserRoles().then((res) => {
    allUserRoles.push(...res.data);
});

const initialState = {
    allUserRoles,
    allAdmins: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
