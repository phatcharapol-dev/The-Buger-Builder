import React from 'react';
import classes from './Order.module.css';
const order = (props) => {
    let ingredients = []
    for(let ingredient in props.ingredient){
        if(props.ingredient[ingredient] > 0){
            ingredients.push({
                ingredient:ingredient,
                count:props.ingredient[ingredient]
            })
        }
    }
    ingredients=ingredients.map( listIngredient => {
        return <span 
        key={listIngredient.ingredient}
        style={{
            textTransform:"capitalize",
            display:'inline-block',
            margin:'0 8px',
            border:'1px solid #ccc',
            padding:'5px'
        }}> 
        {listIngredient.ingredient+'('+listIngredient.count+')'} </span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
}

export default order;