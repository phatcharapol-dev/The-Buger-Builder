import React from 'react';
import Aux from '../../hoc/Auxily';
import classes from './Layout.module.css';
const layouts = (props) => {
    return (
        <Aux>
        <div>Toobar ,Side Bar,Back Drop</div>
        <main className={classes.main}>
            {props.children}
        </main>
        </Aux>
    )

}

export default layouts ;