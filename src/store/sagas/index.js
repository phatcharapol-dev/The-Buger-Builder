import {takeEvery} from 'redux-saga/effects';
import {logoutSaga, checkTimeoutAuthSaga, authUserSaga, authCheckStateSaga} from './auth' ;
import * as actionType from '../actions/actionType';
import { purchaseSaga } from './order';

export function* watchAuth(){
    yield takeEvery(actionType.InitialLogOut,logoutSaga);
    yield takeEvery(actionType.AuthCheckTimeout,checkTimeoutAuthSaga);
    yield takeEvery(actionType.AuthUser,authUserSaga);
    yield takeEvery(actionType.AuthCheckState,authCheckStateSaga);
}

export function* watchOrder(){
    yield takeEvery(actionType.Purchase,purchaseSaga);
}