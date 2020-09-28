import { takeLatest } from 'redux-saga/effects';

import * as UserActionType from '../../actionType/userActionType';
import { updateAdminSaga } from './admin.saga';

export function* userSaga() {
    yield takeLatest(UserActionType._USER_ADMIN_UPDATE, updateAdminSaga);
}
