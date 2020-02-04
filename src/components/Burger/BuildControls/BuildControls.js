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
           {props.buildctrls.map( ctrl => 
               <BuildControl 
               add={props.ingredientAdd} 
               remove={props.ingredientRemove} 
               key={ctrl.type} 
               label={ctrl.label}
               type={ctrl.type}/>
            )}
        </div>
    )
}

export default buildControls;