import { all } from 'redux-saga/effects';
import { loadCalEvtsSaga } from './loadCalEvts.saga';
import { saveCalEvtsSaga } from './saveCalEvts.saga';


export default function* rootSaga() {
    yield all([loadCalEvtsSaga(), saveCalEvtsSaga()]);
}
