import * as actionType from '../actions/actionType';
import {updateObject} from '../../shared/utility';

const initialState = {
    orders:[],
    spinnerFlag:false,
    purchaseFlag:false,
    error:false,
}
const PurchaseInit = (state,action) => {
    return updateObject(state,{purchaseFlag:false});
}

const PurchaseStart = (state,action) => {
    return updateObject(state,{spinnerFlag:true});
}

const PurchaseSuccess = (state,action) => {
    const newOrder = updateObject(action.orderData,{id:action.orderId});
    const updateState = {
        spinnerFlag:false,
        orders:state.orders.concat(newOrder),
        purchaseFlag:true
    };
    return updateObject(state,updateState);
}

const PurchaseFail = (state,action) => {
    return updateObject(state,{spinnerFlag:false});
}

const FetchOrderStart = (state,action) => {
    return updateObject(state,{spinnerFlag:true});
}

const FetchOrderSuccess = (state,action) => {
    const updateSuccess = {
        orders:action.orders,
        spinnerFlag:false
    }
    return updateObject(state,updateSuccess);
}

const FetchOrderFail = (state,action) => {
    const updateFail = {
        spinnerFlag:false,
        error:true
    }
    return updateObject(state,updateFail);
}

const orderReducer = (state=initialState,action) => {
    switch(action.type){
        case actionType.PurchaseInit:return PurchaseInit(state,action)
        case actionType.PurchaseStart:return PurchaseStart(state,action)
        case actionType.PurchaseSuccess:return PurchaseSuccess(state,action)
        case actionType.PurchaseFail:return PurchaseFail(state,action)
        case actionType.FetchOrderStart:return FetchOrderStart(state,action)
        case actionType.FetchOrderSuccess:return FetchOrderSuccess(state,action)
        case actionType.FetchOrderFail:return FetchOrderFail(state,action)
        default:
            return state;
    }
}

export default orderReducer;