import { takeLatest } from 'redux-saga/effects';

import * as AuthActionType from '../../actionType/authActionType';

import { loginSaga } from './login.saga';

export function* authSaga() {
    yield takeLatest(AuthActionType._AUTH_AUTO_LOGIN, loginSaga);
    yield takeLatest(AuthActionType._AUTH_LOGIN, loginSaga);
}
