import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
    let ingredients = Object.keys(props.ingredients).map( (keyIngredient) => {
        return [...new Array(props.ingredients[keyIngredient])].map( (_,index) => {
            return (<BurgerIngredient key={keyIngredient+index} type={keyIngredient}/>)
            })
        }).reduce((arr,el) => {
            return arr.concat(el);
        },[]);

        if(ingredients.length === 0){
            ingredients = <p>Pleases start adding ingredients !</p>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='BreadTop' />
            {ingredients}
            <BurgerIngredient type='BreadBottom' />
        </div>
    )
}

export default burger ;