import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './Checkoutsummary.module.css';
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well !</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button label='CANCEL' type='Danger' clicked={props.checkoutCancel}/>
            <Button label='CONTINUE' type='Success' clicked={props.checkoutContinue}/>
        </div>
    )
}

export default checkoutSummary ;