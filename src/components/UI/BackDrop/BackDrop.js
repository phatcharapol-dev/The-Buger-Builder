import React from 'react';
import classes from './BackDrop.module.css';

const backDrop = props => {
    return (
        <div className={props.show ? classes.BackDrop : null} onClick={props.clicked}></div>
    )
}

export default backDrop;