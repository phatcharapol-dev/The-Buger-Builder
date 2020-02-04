import React from 'react' ;
import Aux from '../../../hoc/Auxily';
const orderSummary = props => {
    const listIngredient = Object.keys(props.listIngredient).map( ingredient => {
        return (
            <li key={ingredient}>
            <span>{ingredient}</span> : {props.listIngredient[ingredient]}
            </li>
        )
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredient :</p>
            <ul>
                {listIngredient}
            </ul>
            <p>Continue to Checkout ?</p>
        </Aux>
    )
}

export default orderSummary ;