import React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props) => {
    const ingredients = props.ingredients.map( ingredient => {
        return (<BurgerIngredient type={ingredient}/>)
    })
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='BreadTop' />
            {ingredients}
            <BurgerIngredient type='BreadBottom' />
        </div>
    )
}

export default burger ;