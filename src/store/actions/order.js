import * as actionType from './actionType';
import axios from '../../axios-orders';

export const purchaseSuccess = (id,orderData) =>{
    return {
        type:actionType.PurchaseSuccess,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseFail = (error) => {
    return {
        type:actionType.PurchaseFail,
        error:error
    }
}
export const purchaseStart = () => {
    return {
        type:actionType.PurchaseStart
    }
}
export const purchase = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseStart())
        axios.post('/orders.json',orderData)
        .then(res => {
            console.log(res)
            dispatch(purchaseSuccess(res.data.name,orderData))
        })
        .catch(err =>{
            console.log(err)
            dispatch(purchaseFail(err));
        })
    }
}

export const purchaseInit = () => {
    return (dispatch) => {
        dispatch({type:actionType.PurchaseInit})
    }
}