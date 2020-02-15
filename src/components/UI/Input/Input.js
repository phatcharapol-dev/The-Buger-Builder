import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null ;
    let classArr = [classes.InputElement] ;
    if(props.isValid && props.touched){
        classArr.push(classes.Invalid) ;
        validationError= <p className={classes.ValidationError}>{props.errorMessage}</p>
    }
    switch(props.elementType){
        case('input'):
            inputElement = <input className={classArr.join(' ')}
            {...props.elementConfig} 
            defaultValue={props.value}
            onChange={props.changeHandler}/>;
            break;
        case('textarea'):
            inputElement = <textarea className={classArr.join(' ')}
            {...props.elementConfig} 
            defaultValue={props.value}
            onChange={props.changeHandler}/>;
            break;
        case('select'):
            let options =props.elementConfig.options.map( option => {
                return (<option key={option.value} value={option.value}>
                    {option.displayValue}
                    </option>)
            })
            inputElement = (<select className={classArr.join(' ')} defaultValue={props.value}
            onChange={props.changeHandler}>
            {options}
            </select>);
            break;
        default:
            inputElement = <input className={classArr.join(' ')}
            {...props.elementConfig} 
            defaultValue={props.value}
            onChange={props.changeHandler}/>;
        }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;