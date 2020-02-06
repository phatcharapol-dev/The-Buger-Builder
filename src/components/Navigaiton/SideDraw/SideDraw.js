import React from 'react';
import classes from './SideDraw.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/BackDrop/BackDrop'
import Aux from '../../../hoc/Auxily/Auxily';

const sideDraw = (props) => {

    const attendClasses = props.show ? [classes.SideDraw,classes.Open] : [classes.SideDraw,classes.Close] ;

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.cancelSideDraw}/>
            <div className={attendClasses.join(' ')}>
                <div className={classes.Logo}>
                <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
}

export default sideDraw ;