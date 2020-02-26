import React from 'react' ;
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import {updateObject,checkValidate} from '../../shared/utility';
class Auth extends React.Component{
    state = {
        authForm:{
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
                password:{
                    elementType:'input',
                    elementConfig:{
                        type:'password',
                        placeholder:'Password'
                    },
                    validation:{
                        required:true,
                        minLength:6
                    },
                    isValid:false,
                    touched:false,
                    value:''
                },
        },
        isSignUp:true
    }

    inputChangeHandler = (event,identifyInput) => {
  
        let updateInput = updateObject(this.state.authForm[identifyInput],{
            value:event.target.value,
            isValid:checkValidate(event.target.value,this.state.authForm[identifyInput].validation),
            touched:true
        })
        let authForm = updateObject(this.state.authForm,{
            [identifyInput]:updateInput
        })
       

        let FormisValid = true ;
        for(let inputIdentify in authForm){
            FormisValid = authForm[inputIdentify].isValid && FormisValid;
        }
        this.setState({
            authForm:{...authForm},
            FormisValid:FormisValid
        })
    }

    onSubmit = (event) => {
        event.preventDefault() ;
        this.props.onAuth(this.state.authForm.email.value,this.state.authForm.password.value,this.state.isSignUp)
    }

    onSwitchMethodHandler = () => {
        this.setState({
            isSignUp:!this.state.isSignUp
        })
    }

    render(){
        let formElement = [] ;
        for( let key in this.state.authForm){
            formElement.push({
                id:key,
                config:this.state.authForm[key]
            })
        }
        let input  = (
            formElement.map( element => 
                <Input key={element.id} 
                elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig} 
                value={element.config.value}
                isValid={!element.config.isValid}
                touched={element.config.touched}
                errorMessage={'Please enter a valid '+element.id}
                changeHandler={(event) => this.inputChangeHandler(event,element.id)}/>               
            )   
        )
        if(this.props.spinnerFlag){
           input = <Spinner/>;
        }
        let error = null ;
        if(this.props.error){
            error = <h3 style={{color:'red'}}>{this.props.error}</h3> ;
        }
        let isAuth = null ;
        if(this.props.isAuthenticated){
            isAuth = <Redirect to={this.props.authRedirectPath} />;
        }
        console.log(this.props);

        return (
            <div className={classes.Auth}>
                {isAuth}
                <h1>{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</h1>
                <form onSubmit={(event)=>this.onSubmit(event)}>
                {input}
                {error}
                <Button label='Submit' type='Success'/>
                </form>
                <Button 
                clicked={this.onSwitchMethodHandler}
                label={this.state.isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'} type='Danger'/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        spinnerFlag:state.auth.spinnerFlag,
        error:state.auth.error,
        token:state.auth.token,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth:(email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth) ;