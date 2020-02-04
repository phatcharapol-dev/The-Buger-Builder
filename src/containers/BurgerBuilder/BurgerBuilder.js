import React from 'react' ;
import Aux from '../../hoc/Auxily';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const IngredientPrice = {
    Salad:0.5,
    Meat:1,
    Cheese:0.7,
    Bacon:1.2
}
class BurgerBuilder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            burgerIngredient:{
                Salad:0,
                Meat:0,
                Cheese:0,
                Bacon:0,
            },
            buildControls:[
            {label:'Salad',type:'Salad'},
            {label:'Bacon',type:'Bacon'},
            {label:'Chesse',type:'Cheese'},
            {label:'Meat',type:'Meat'}
            ],
            TotalPrice:0
        }    
    }

    addIngredientHandler = (type) => {
        console.log(this.state.burgerIngredient);
        //Add Ingredient
        let burgerIngredient = {...this.state.burgerIngredient} ;
        let oldCount = burgerIngredient[type];
        let updateCount = oldCount+1;
        burgerIngredient[type] = updateCount;

        //Add Price
        let TotalPrice = this.state.TotalPrice;
        let updateTotalPrice = TotalPrice+IngredientPrice[type] ; 
        this.setState({
            burgerIngredient:{
                ...burgerIngredient
             },
            TotalPrice:updateTotalPrice
        });
        console.log(this.state);   
    }
    removeIngredientHandler = (type) => {
        let burgerIngredient = {...this.state.burgerIngredient} ;
        let oldCount = burgerIngredient[type];
        let updateCount = null;
        if(oldCount > 0) {
            return ;
        }
             //Remove Ingredient
            updateCount = oldCount-1;
            burgerIngredient[type] = updateCount;
            //Remove Price
            let TotalPrice = this.state.TotalPrice;
            let updateTotalPrice = TotalPrice+IngredientPrice[type] ; 
            this.setState({
                burgerIngredient:{
                    ...burgerIngredient
                },
                TotalPrice:updateTotalPrice
            });
       
    }
    render(){
        return (
            <Aux>
               <Burger ingredients={this.state.burgerIngredient}/>
               <BuildControls ingredientAdd={this.addIngredientHandler} ingredientRemove={this.removeIngredientHandler} buildctrls={this.state.buildControls}/>
            </Aux>
        )
    }
}

export default BurgerBuilder ;