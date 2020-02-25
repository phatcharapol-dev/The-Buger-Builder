import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends React.Component{

    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render(){
        let order = <Spinner/>;
        if(!this.props.spinnerFlag){
            order = this.props.orders.map( order => {
                return <Order key={order.id} price={order.price} ingredient={order.ingredient}/>
            }) ;
        }
        return (
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
        error:state.order.error,
        token:state.auth.token,
        userId:state.auth.userId
    }
} ;
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders:(token,userId) => dispatch(actions.fetchOrder(token,userId))
    }
} ;

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios)) ;