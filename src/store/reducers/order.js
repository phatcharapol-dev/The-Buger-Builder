import * as actionType from '../actions/actionType';

const initialState = {
    order:[],
    spinnerFlag:false,
    PurchaseFlag:false
}

const orderReducer = (state=initialState,action) => {
    switch(action.type){
        case actionType.PurchaseInit:
            return {
                ...state,
                PurchaseFlag:false
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
                order:state.order.concat(newOrder),
                PurchaseFlag:true
            }
        case actionType.PurchaseFail:
            return {
                ...state,
                spinnerFlag:false
            }
        default:
            return state;
    }
}

export default orderReducer;