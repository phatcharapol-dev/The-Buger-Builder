import * as actionType from '../actions/actionType';

const IngredientPrice = {
    Salad:0.5,
    Meat:1,
    Cheese:0.7,
    Bacon:1.2
}

const initialState = {
    burgerIngredient:null,
    TotalPrice:0,
    PurchaseFlag:false,
    spinnerFlag:true,
    error:false
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
        case actionType.SetIngredient:
            return {
                ...state,
                burgerIngredient:{
                    Salad:action.ingredientType.Salad,
                    Meat:action.ingredientType.Meat,
                    Cheese:action.ingredientType.Cheese,
                    Bacon:action.ingredientType.Bacon,
                },
                TotalPrice:0,
                error:false,
                spinnerFlag:false,
                PurchaseFlag:false
            }
        case actionType.FetchIngredientFailed:
            return{
                ...state,
                error:true,
                spinnerFlag:true
            }
        default:
            return state;
    }
}

export default reducer ;