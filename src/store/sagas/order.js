import {put} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';
export function* purchaseSaga(action){
    yield put(actions.purchaseStart())
    const res = yield axios.post('/orders.json?auth='+action.token,action.orderData)
    try{
        yield put(actions.purchaseSuccess(res.data.name,action.orderData))
    }catch(err){
        yield put(actions.purchaseFail(err));
    };
    
}