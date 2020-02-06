import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItems from './NavigationItem/NavigationItem';
const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItems active={true} link='/'>Burger Builder</NavigationItems>
            <NavigationItems link='/'>Checkout</NavigationItems>
        </ul>
    )
}

export default navigationItems ;