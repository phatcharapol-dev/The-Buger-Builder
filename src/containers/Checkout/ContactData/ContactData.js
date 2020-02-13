import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends React.Component{
    state ={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:'',
        },
        spinnerFlag:true,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({spinnerFlag:true})
        const order = {
            ingredient:this.props.ingredients,
            price:this.props.TotalPrice.toFixed(2),
            customer:{
                name:'Phatcharapol Tridechee',
                address:{
                    street:'Test Street',
                    zipCode:'12344',
                    country:'Bangkok'
                }
            },
            deliveryMethod:'fastest'
        }
        console.log(this.props);
        axios.post('/orders.json',order)
        .then(res => {
            this.setState({spinnerFlag:false,purchaseModalFlag:false});
            this.props.history.push('/');
            console.log(res)
        })
        .catch(err =>{
            this.setState({spinnerFlag:false,purchaseModalFlag:false});
            console.log(err)
        })
    }

    render(){
        return (
            <div className={classes.ContactData}>
                <h1>Enter Your Contact Data</h1>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
                    <input className={classes.Input} type='email' name='email' placeholder='Your Email'/>
                    <input className={classes.Input} type='text' name='street' placeholder='Street'/>
                    <input className={classes.Input} type='text' name='postalCode' placeholder='Postal Code'/>
                    <Button label='Order' type='Success' clicked={this.orderHandler}/>
                </form>
            </div>
        )
    }
}

export default ContactData;