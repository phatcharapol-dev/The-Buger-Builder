import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
class ContactData extends React.Component{
    state ={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:''
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:''
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:''
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'',displayValue:'-'},
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}]
                },
                value:''
            }
        },
        spinnerFlag:false,
    }

    orderHandler = () => {
        this.setState({spinnerFlag:true})
        let orderData = {};
        for(let key in this.state.orderForm){
            orderData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredient:this.props.ingredients,
            price:this.props.TotalPrice.toFixed(2),
            orderData:orderData
        }
        console.log(this.props);
        axios.post('/orders.json',order)
        .then(res => {
            this.setState({spinnerFlag:false});
            this.props.history.push('/');
            console.log(res)
        })
        .catch(err =>{
            this.setState({spinnerFlag:false});
            console.log(err)
        })
    }

    inputChangeHandler = (event,identifyInput) => {
        let updateOrder = {...this.state.orderForm};
        let updateInputOrder = {
            ...updateOrder[identifyInput]
        }
        updateInputOrder.value = event.target.value ;
        updateOrder[identifyInput] = updateInputOrder;
        this.setState({
            orderForm:{...updateOrder}
        })
    }

    render(){
        console.log(this.state);
        let formElementArray = [] ;
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit={this.orderHandler}>
                    {formElementArray.map( element => {
                         return (
                        <Input key={element.id} 
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig} 
                        value={element.config.value}
                        changeHandler={(event) => this.inputChangeHandler(event,element.id)}/>    
                        )
                    })}
         <Button label='Order' type='Success'/>
        </form>)
    
        if(this.state.spinnerFlag){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h1>Enter Your Contact Data</h1>
                {form}
            </div>
        )
    }
}

export default ContactData;