import * as actionType from './action';

const IngredientPrice = {
    Salad:0.5,
    Meat:1,
    Cheese:0.7,
    Bacon:1.2
}

const initialState = {
    burgerIngredient:{
        Salad:0,
        Meat:0,
        Cheese:0,
        Bacon:0        
    },
    TotalPrice:0,
    PurchaseFlag:false,
}

const updatePurchaseState = (updateIngredient) => {
   
    const sum = Object.keys(updateIngredient).map( ingredientKey => {
        return updateIngredient[ingredientKey]
    }).reduce( (sum,el) => {
        return sum+el ;
    },0)

    return sum>0 ;
}

const reducer = (state=initialState,action) => {
    let newState ={}; 
    switch(action.type){
        case actionType.AddIngredient:
         newState = {
            ...state,
            burgerIngredient:{
                ...state.burgerIngredient,
                [action.ingredientType]:state.burgerIngredient[action.ingredientType]+1,
            },
            TotalPrice:state.TotalPrice+IngredientPrice[action.ingredientType],
        }
        return {
            ...newState,
            PurchaseFlag:updatePurchaseState(newState.burgerIngredient)
        }
        case actionType.RemoveIngredient:
         newState = {
            ...state,
            burgerIngredient:{
                ...state.burgerIngredient,
                [action.ingredientType]:state.burgerIngredient[action.ingredientType]-1,
            },
            TotalPrice:state.TotalPrice-IngredientPrice[action.ingredientType],
        }
        return {
            ...newState,
            PurchaseFlag:updatePurchaseState(newState.burgerIngredient)
        }
        default:
            return state;
    }
}

export default reducer ;