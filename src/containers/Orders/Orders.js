import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends React.Component{
    state = {
        orders:[],
        spinnerFlag:true
    }
    componentDidMount(){
        console.log('[Orders} ComponentDidMount');
        this.props.onFetchOrders();
    }
    render(){
        console.log(this.props.orders);
        let order = this.props.orders.map( order => {
            return <Order key={order.id} price={order.price} ingredient={order.ingredient}/>
        })
        if(this.props.spinnerFlag){
            order = <Spinner/>
        }
        return(
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders:state.order.orders,
        purchaseFlag:state.order.purchaseFlag,
        spinnerFlag:state.order.spinnerFlag,
        error:state.order.error
    }
} ;
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders:() => dispatch(actions.fetchOrder)
    }
} ;

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios)) ;