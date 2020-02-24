import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItems from './NavigationItem/NavigationItem';
const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItems link='/' exact>Burger Builder</NavigationItems>
            {props.isAuth 
            ? <NavigationItems link='/order'>Order</NavigationItems>
            : null }
            {props.isAuth 
            ? <NavigationItems link='/logout'>Log Out</NavigationItems> 
            : <NavigationItems link='/auth'>Authenticate</NavigationItems>}
            
        </ul>
    )
}

export default navigationItems ;