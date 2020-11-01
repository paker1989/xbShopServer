/**
 * add customer form
 */
// import * as userActionType from '../../../actionType/userActionType';

const formInitialState = {
    phoneNumber: '',
    pseudo: '',
    email: '',
    gender: 'm', // m or f
    thumbnail: '',
};

const initialState = {
    ...formInitialState,
    backendStatus: '',
    backendMsg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
