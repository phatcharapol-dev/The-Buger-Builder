import {put,delay} from 'redux-saga/effects' ;
import axios from 'axios';
import * as actions from '../actions/index';

export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expireDateTime');
    yield localStorage.removeItem('userId');
    yield put(actions.logOutSucceed())
}

export function* checkTimeoutAuthSaga(action){
    yield delay(action.expireMilisec*1000) ;
    yield put(actions.logOut());
  
}

export function* authUserSaga(action){
    yield put(actions.authStart())
    const authData = {
        email:action.email,
        password:action.password,
        returnSecureToken:true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJMa1MNyQHITxPvvLtVPC-4rxdWu8tC5A';
    if(action.isSignUp){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJMa1MNyQHITxPvvLtVPC-4rxdWu8tC5A';
    }
    try{
        const res = yield axios.post(url,authData)
        const expireDateTime = new Date(new Date().getTime()+res.data.expiresIn*1000) ;
        yield localStorage.setItem('token',res.data.idToken);
        yield localStorage.setItem('expireDateTime',expireDateTime);
        yield localStorage.setItem('userId',res.data.localId)
        yield put(actions.authSuccess(res.data.idToken,res.data.localId));
        yield put(actions.checkTimeoutAuth(res.data.expiresIn));
      
    }catch(error){
        yield put(actions.authFail(error.response.data.error.message));
    }

}

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
    if(!token) {
        yield put(actions.logOut());
    }else {
       
        const expireDateTime = yield new Date(localStorage.getItem('expireDateTime')).getTime();
        if(expireDateTime < new Date().getTime() ){
            yield put(actions.logOut());
        }else{
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess(token,userId));
            yield put(actions.checkTimeoutAuth((expireDateTime-new Date().getTime())/1000));
        }
    }
}

