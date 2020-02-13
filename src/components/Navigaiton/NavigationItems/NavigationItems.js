import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItems from './NavigationItem/NavigationItem';
const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItems link='/' exact>Burger Builder</NavigationItems>
            <NavigationItems link='/order'>Order</NavigationItems>
        </ul>
    )
}

export default navigationItems ;