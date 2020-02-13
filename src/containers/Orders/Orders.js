import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component{
    state = {
        orders:[],
        spinnerFlag:true
    }
    componentDidMount(){
        let fetchOrders = [] ;
        axios.get('/orders.json')
        .then(res => {
            console.log(res);
            for(let key in res.data){
                fetchOrders.push({
                    id:key,
                    ...res.data[key]
                });
            }
            console.log(fetchOrders);
            this.setState({
                orders:fetchOrders,
                spinnerFlag:false
            })
            // console.log(res)
        })
        .catch(err=> {
            console.log(err)
        })
    }
    render(){
        let order = this.state.orders.map( order => {
            return <Order key={order.id} price={order.price} ingredient={order.ingredient}/>
        })
        if(this.state.spinnerFlag){
            order = <Spinner/>
        }
        return(
            <div>
                {order}
            </div>
        )
    }
}

export default withErrorHandler(Orders,axios) ;