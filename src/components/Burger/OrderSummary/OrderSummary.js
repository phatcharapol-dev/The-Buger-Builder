import React from 'react' ;
import Aux from '../../../hoc/Auxily';
import Button from '../../UI/Button/Button';
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
            <p><strong>Total price </strong>: {props.totalPrice.toFixed(2)}</p>
            <p>Continue to Checkout ?</p>
            <Button clicked={props.cancelModal} type='Success' label='CANCEL'/>
            <Button clicked={props.continueModal} type='Danger' label='CONTINUE'/>
        </Aux>
    )
}

export default orderSummary ;