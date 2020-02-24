import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends React.Component{
    state ={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                validation:{
                    required:true,
                },
                isValid:false,
                touched:false,
                value:''
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                validation:{
                    required:true,
                },
                isValid:false,
                touched:false,
                value:''
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5,
                    isNumeric:true
                },
                isValid:false,
                touched:false,
                value:''
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                validation:{
                    required:true,
                },
                isValid:false,
                touched:false,
                value:''
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                validation:{
                    required:true,
                    isEmail:true
                },
                isValid:false,
                touched:false,
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
                validation:{
                    required:true,
                },
                isValid:false,
                touched:false,
                value:''
            }
        },
        FormisValid:false,
    }

    orderHandler = () => {
        this.setState({spinnerFlag:true})
        let orderData = {};
        for(let key in this.state.orderForm){
            orderData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredient:this.props.ing,
            price:this.props.price.toFixed(2),
            orderData:orderData
        }
        this.props.orderFormHandler(order,this.props.token);
        
    }
    checkValidate = (value,rule) => {
        let isValid = true ;
        if(rule.required){
            isValid = value.trim() !== '' && isValid ;
        }
        if(rule.minLength){
            isValid = value.length >= rule.minLength && isValid;
        }
        if(rule.maxLength){
            isValid = value.length <= rule.maxLength && isValid ;
        }
        if(rule.isEmail){
            const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            isValid = pattern.test(value) && isValid ;
        }
        if(rule.isNumeric){
            const reg = /^\d+$/;
            isValid = reg.test(value) && isValid;
        }
        return isValid ;
    }
    inputChangeHandler = (event,identifyInput) => {
        let updateOrder = {...this.state.orderForm};
        let updateInputOrder = {
            ...updateOrder[identifyInput]
        }
        updateInputOrder.value = event.target.value ;
        updateInputOrder.isValid=this.checkValidate(updateInputOrder.value,updateInputOrder.validation);
        updateInputOrder.touched = true ;
        updateOrder[identifyInput] = updateInputOrder;

        let FormisValid = true ;
        for(let inputIdentify in updateOrder){
            FormisValid = updateOrder[inputIdentify].isValid && FormisValid;
        }
        this.setState({
            orderForm:{...updateOrder},
            FormisValid:FormisValid
        })
    }

    render(){
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
                        isValid={!element.config.isValid}
                        touched={element.config.touched}
                        errorMessage={'Please enter a valid '+element.id}
                        changeHandler={(event) => this.inputChangeHandler(event,element.id)}/>    
                        )
                    })}
         <Button label='Order' type='Success' disable={!this.state.FormisValid}/>
        </form>)
    
        if(this.props.spinnerFlag){
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

const mapStateToProps = state => {
    return {
        ing:state.burgerBuilder.burgerIngredient,
        price:state.burgerBuilder.TotalPrice,
        spinnerFlag:state.order.spinnerFlag,
        token:state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderFormHandler:(orderData,token)=>dispatch(actions.purchase(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));