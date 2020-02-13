import React from 'react';
import CheckoutSummary from '../../components/Order/Checkoutsummary/Checkoutsummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
class Checkout extends React.Component{
    state={
        ingredients:{
            Salad:0,
            Cheese:0,
            Meat:0,
            Bacon:0
        },
        TotalPrice:0
    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let TotalPrice=0;
        for(let param of query.entries()){
            //['Salad','1']
            if(param[0] === 'TotalPrice'){
                TotalPrice = +param[1];
            }else{
                ingredients[param[0]]= +param[1];
            }
        }
        this.setState({
            ingredients:{...ingredients},
            TotalPrice:TotalPrice
        })

    }
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
        ingredients={this.state.ingredients}
        checkoutContinue={this.checkoutContinueHandler}
        checkoutCancel={this.checkoutCancelHandler}/>
        <Route path={this.props.match.path+'/contact-data'} 
        render={(props) => <ContactData {...props} ingredients={this.state.ingredients} TotalPrice={this.state.TotalPrice}/>}/>
        </div>
        )
    }
}

export default Checkout;