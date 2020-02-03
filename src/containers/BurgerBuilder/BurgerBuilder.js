import React from 'react' ;
import Aux from '../../hoc/Auxily';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            burgerIngredient:['Meat','Cheese','Cheese','Meat','Cheese','Bacon']
        }    
    }
    render(){
        return (
            <Aux>
               <Burger ingredients={this.state.burgerIngredient}/>
                <div>Build Control</div>
            </Aux>
        )
    }
}

export default BurgerBuilder ;