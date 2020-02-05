import React from 'react' ;
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

// const controls = [
//     {label:'Salad',type:'Salad'},
//     {label:'Bacon',type:'Bacon'},
//     {label:'Chesse',type:'Cheese'},
//     {label:'Meat',type:'Meat'}
// ];
const buildControls = props => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price : <strong>{props.totalPrice.toFixed(2)}</strong> $</p>
           {props.buildctrls.map( ctrl => 
               <BuildControl 
               add={props.ingredientAdd} 
               remove={props.ingredientRemove} 
               key={ctrl.type} 
               label={ctrl.label}
               disabled={props.disableInfo[ctrl.type]}
               type={ctrl.type}/>
            )}
            <button className={classes.OrderButton} disabled={!props.purchaseFlag} onClick={props.purchaseModal}>Order Now</button>
        </div>
    )
}

export default buildControls;