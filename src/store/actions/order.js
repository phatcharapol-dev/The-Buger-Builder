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
export const purchase = (orderData,token) => {
    return {
        type:actionType.Purchase,
        orderData:orderData,
        token:token
    }
}

export const purchaseInit = () => {
    return (dispatch) => {
        dispatch({type:actionType.PurchaseInit})
    }
}

export const fetchOrderStart = () => {
    return  {
        type:actionType.FetchOrderStart
    }
}
export const fetchOrderSuccess = (fetchOrders) => {
    return {
        type:actionType.FetchOrderSuccess,
        orders:fetchOrders,
    }
}

export const fetchOrderFail = (err) => {
    return {
        type:actionType.FetchOrderFail,
        error:err
    }
}

export const fetchOrder = (token,userId) => {
    return (dispatch) => {
        dispatch(fetchOrderStart());
        const queryParams = '&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json?auth='+token+queryParams)
        .then(res => {
            let fetchOrders = [] ;
            for(let key in res.data){
                fetchOrders.push({
                    id:key,
                    ...res.data[key]
                });
            }
            dispatch(fetchOrderSuccess(fetchOrders));
        })
        .catch(err=> {
            dispatch(fetchOrderFail(err));
        })
    }
}