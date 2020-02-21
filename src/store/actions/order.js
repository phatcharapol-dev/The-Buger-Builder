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
            dispatch(purchaseSuccess(res.data.name,orderData))
        })
        .catch(err =>{
            dispatch(purchaseFail(err));
        })
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

export const fetchOrder = () => {
    return (dispatch) => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
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