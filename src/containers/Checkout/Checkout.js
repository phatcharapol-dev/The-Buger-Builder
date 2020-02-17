import React from 'react';
import CheckoutSummary from '../../components/Order/Checkoutsummary/Checkoutsummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
class Checkout extends React.Component{

    checkoutContinueHandler = () => {
        console.log('continueCheckout')
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelHandler = () => {
        console.log('cancelCheckout');
        this.props.history.goBack();
    }
    render(){
        console.log(this.state);
        return (
        <div>
        <CheckoutSummary 
        ingredients={this.props.ing}
        checkoutContinue={this.checkoutContinueHandler}
        checkoutCancel={this.checkoutCancelHandler}/>
        <Route 
        path={this.props.match.path+'/contact-data'} 
        component={ContactData}/>
        </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ing:state.burgerIngredient,
    }
}
export default connect(mapStateToProps)(Checkout);