import { takeLatest } from 'redux-saga/effects';

import * as UserActionType from '../../actionType/userActionType';
import { updateAdminSaga, getAllUserRoles, attemptDeleteUserrole } from './admin.saga';

export function* userSaga() {
    yield takeLatest(UserActionType._USER_ADMIN_UPDATE, updateAdminSaga);
    yield takeLatest(UserActionType._USER_ADMIN_FETCH_ALL_USERROLES, getAllUserRoles);
    yield takeLatest(UserActionType._USER_ADMIN_ATTEMPT_DELETE_USERROLE, attemptDeleteUserrole);
}
