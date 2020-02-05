import React from 'react';
import classes from "./Modal.module.css";
import BackDrop from '../BackDrop/BackDrop';
import Aux from '../../../hoc/Auxily'

const modal = props => {
    console.log(props)

    return (
        <Aux>
            <BackDrop show={props.show} clicked={props.click}/>
            <div className={classes.Modal} 
            style={props.show ? {
                display:"block",
                } :{
                display:'none',
                }}>
                {props.children}
            </div>
        </Aux>
    )
}

export default modal ;