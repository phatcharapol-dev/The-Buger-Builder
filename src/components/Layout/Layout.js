import React from 'react';
import Aux from '../../hoc/Auxily';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigaiton/Toolbar/Toolbar';
const layouts = (props) => {
    return (
        <Aux>
        <Toolbar/>
        <main className={classes.main}>
            {props.children}
        </main>
        </Aux>
    )

}

export default layouts ;