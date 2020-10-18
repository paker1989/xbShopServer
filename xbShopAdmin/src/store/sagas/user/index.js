import { takeLatest } from 'redux-saga/effects';

import * as UserActionType from '../../actionType/userActionType';
import {
    updateAdminSaga,
    getAllUserRoles,
    getAllUserAccesses,
    attemptDeleteUserrole,
    updateRoleSaga,
    getAllAdminSaga,
} from './admin.saga';

export function* userSaga() {
    yield takeLatest(UserActionType._USER_ADMIN_UPDATE, updateAdminSaga);
    yield takeLatest(UserActionType._USER_ADMIN_FETCH_ALL, getAllAdminSaga);
    yield takeLatest(UserActionType._USER_ROLE_UPDATE, updateRoleSaga);
    yield takeLatest(UserActionType._USER_ADMIN_FETCH_ALL_USERROLES, getAllUserRoles);
    yield takeLatest(UserActionType._USER_ROLE_FETCH_ALL_USERACCESSES, getAllUserAccesses);
    yield takeLatest(UserActionType._USER_ADMIN_ATTEMPT_DELETE_USERROLE, attemptDeleteUserrole);
}
