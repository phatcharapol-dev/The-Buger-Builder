import * as actionType from '../actions/actionType';

const initialState = {
    orders:[],
    spinnerFlag:false,
    purchaseFlag:false,
    error:false,
}

const orderReducer = (state=initialState,action) => {
    switch(action.type){
        case actionType.PurchaseInit:
            return {
                ...state,
                purchaseFlag:false
            }
        case actionType.PurchaseStart:
            return {
                ...state,
                spinnerFlag:true
            }
        case actionType.PurchaseSuccess:
            const newOrder = {
                ...action.orderData,
                id:action.orderId,
               
            }
            return {
                ...state,
                spinnerFlag:false,
                orders:state.orders.concat(newOrder),
                purchaseFlag:true
            }
        case actionType.PurchaseFail:
            return {
                ...state,
                spinnerFlag:false
            }
        case actionType.FetchOrderStart:
            return {
                ...state,
                spinnerFlag:true
            }
        case actionType.FetchOrderSuccess:
            console.log(action);
            return {
                ...state,
                orders:action.orders,
                spinnerFlag:false
            }
        case actionType.FetchOrderFail:
            return {
                ...state,
                spinnerFlag:false,
                error:true
            }
        default:
            return state;
    }
}

export default orderReducer;