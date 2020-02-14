import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    switch(props.elementType){
        case('input'):
            inputElement = <input className={classes.InputElement}
            {...props.elementConfig} 
            defaultValue={props.value}
            onChange={props.changeHandler}/>;
            break;
        case('textarea'):
            inputElement = <textarea className={classes.InputElement}
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
            inputElement = (<select className={classes.InputElement} defaultValue={props.value}
            onChange={props.changeHandler}>
            {options}
            </select>);
            break;
        default:
            inputElement = <input className={classes.InputElement}
            {...props.elementConfig} 
            defaultValue={props.value}
            onChange={props.changeHandler}/>;
        }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;