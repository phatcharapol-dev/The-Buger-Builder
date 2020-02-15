import React from 'react' ;
import classes from './Button.module.css';

const button = props => {
    return (
        <button className={[classes.Button,classes[props.type]].join(' ')} 
        onClick={props.clicked}
        disabled={props.disable}>{props.label}</button>
    )
}

export default button;