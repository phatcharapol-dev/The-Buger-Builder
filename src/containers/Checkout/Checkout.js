import React from 'react';
import CheckoutSummary from '../../components/Order/Checkoutsummary/Checkoutsummary';
import ContactData from './ContactData/ContactData';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class Checkout extends React.Component{

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    render(){
        let summary = <Redirect to="/"/>
        if(this.props.ing)
        {
            const PurchaseRedirect = this.props.purchaseFlag ? <Redirect to ='/'/> : null ;

            summary = (
                <div>
                {PurchaseRedirect}
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
        return summary ;
    }
}
const mapStateToProps = state => {
    return {
        ing:state.burgerBuilder.burgerIngredient,
        purchaseFlag:state.order.PurchaseFlag
    }
}
export default connect(mapStateToProps)(Checkout);