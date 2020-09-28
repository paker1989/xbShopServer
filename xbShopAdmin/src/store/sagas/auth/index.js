import { takeLatest } from 'redux-saga/effects';

import * as AuthActionType from '../../actionType/authActionType';

import { loginSaga, logoutSaga } from './login.saga';
// import { updateAdminSaga } from './admin.saga';

export function* authSaga() {
    yield takeLatest(AuthActionType._AUTH_AUTO_LOGIN, loginSaga);
    yield takeLatest(AuthActionType._AUTH_LOGIN, loginSaga);
    yield takeLatest(AuthActionType._AUTH_LOGOUT, logoutSaga);
    // yield takeLatest(AuthActionType._AUTH_ADMIN_UPDATE, updateAdminSaga);
}
