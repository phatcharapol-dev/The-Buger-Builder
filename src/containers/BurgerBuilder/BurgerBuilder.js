import React from 'react' ;
import Aux from '../../hoc/Auxily';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
            TotalPrice:0,
            purchaseFlag:false
        }    
    }
    updatePurchaseState = (updateIngredient) => {
   
        const sum = Object.keys(updateIngredient).map( ingredientKey => {
            return updateIngredient[ingredientKey]
        }).reduce( (sum,el) => {
            return sum+el ;
        },0)

        this.setState({
            purchaseFlag:(sum > 0)
        })
    }

    addIngredientHandler = (type) => {
        //Add Ingredient
        let updateburgerIngredient = {...this.state.burgerIngredient} ;
        let oldCount = updateburgerIngredient[type];
        let updateCount = oldCount+1;
        updateburgerIngredient[type] = updateCount;

        //Add Price
        let TotalPrice = this.state.TotalPrice;
        let updateTotalPrice = TotalPrice+IngredientPrice[type] ; 
        console.log(this.state);
        this.setState({
            burgerIngredient:{
                ...updateburgerIngredient
             },
            TotalPrice:updateTotalPrice,
        });
        console.log(this.state);
        this.updatePurchaseState(updateburgerIngredient);
    }
    removeIngredientHandler = (type) => {
        let updateburgerIngredient = {...this.state.burgerIngredient} ;
        let oldCount = updateburgerIngredient[type];
        let updateCount = null;

        //Remove Ingredient
        updateCount = oldCount-1;
        updateburgerIngredient[type] = updateCount;
        console.log(updateCount);
      
        //Remove Price
        let TotalPrice = this.state.TotalPrice;
        let updateTotalPrice = TotalPrice-IngredientPrice[type] ; 

        this.setState({
            burgerIngredient:{
                ...updateburgerIngredient
            },
            TotalPrice:updateTotalPrice,
        });
        this.updatePurchaseState(updateburgerIngredient);
       
    }

    render(){
        const disableInfo = {
            ...this.state.burgerIngredient
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0 ;
        }
        return (
            <Aux>
               <Modal>
                <OrderSummary listIngredient={this.state.burgerIngredient}/>
               </Modal>
               <Burger ingredients={this.state.burgerIngredient}/>
               <BuildControls
               totalPrice={this.state.TotalPrice} 
               ingredientAdd={this.addIngredientHandler} 
               ingredientRemove={this.removeIngredientHandler}
               disableInfo={disableInfo}
               purchaseFlag={this.state.purchaseFlag} 
               buildctrls={this.state.buildControls}/>     
            </Aux>
        )
    }
}

export default BurgerBuilder ;