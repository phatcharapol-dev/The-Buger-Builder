import React from 'react' ;
import Aux from '../../../hoc/Auxily/Auxily';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component{

    //This could'be a functional component,doesn't have to be a class
    // componentWillUpdate(){
    //     console.log('[OrderSummary] will update');
    // }
    render(){
        const listIngredient = Object.keys(this.props.listIngredient).map( ingredient => {
            return (
                <li key={ingredient}>
                <span>{ingredient}</span> : {this.props.listIngredient[ingredient]}
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
            <p><strong>Total price </strong>: {this.props.totalPrice.toFixed(2)}</p>
            <p>Continue to Checkout ?</p>
            <Button clicked={this.props.cancelModal} type='Success' label='CANCEL'/>
            <Button clicked={this.props.continueModal} type='Danger' label='CONTINUE'/>
        </Aux>
    )
}
    
}

export default OrderSummary ;