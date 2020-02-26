import * as actionType from '../actions/actionType';
import {updateObject} from '../../shared/utility';

const IngredientPrice = {
    Salad:0.5,
    Meat:1,
    Cheese:0.7,
    Bacon:1.2
}

const initialState = {
    burgerIngredient:null,
    TotalPrice:0,
    purchaseFlag:false,
    spinnerFlag:true,
    error:false,
}

const updatePurchaseState = (updateIngredient) => {
    const sum = Object.keys(updateIngredient).map( ingredientKey => {
        return updateIngredient[ingredientKey]
    }).reduce( (sum,el) => {
        return sum+el ;
    },0)

    return sum>0 ;
}

const AddIngredient = (state,action) =>{
    const updateAddIng = {[action.ingredientType]:state.burgerIngredient[action.ingredientType]+1};
    const updateAddIngs = updateObject(state.burgerIngredient,updateAddIng);
    const updateAddState = {
        burgerIngredient:updateAddIngs,
        TotalPrice:state.TotalPrice+IngredientPrice[action.ingredientType],
        purchaseFlag:updatePurchaseState(updateAddIngs),
    }
    return updateObject(state,updateAddState);
}

const RemoveIngredient = (state,action) => {
    const updateRemoveIng = {[action.ingredientType]:state.burgerIngredient[action.ingredientType]-1};
    const updateRemoveIngs = updateObject(state.burgerIngredient,updateRemoveIng);
    const updateRemoveState = {
        burgerIngredient:updateRemoveIngs,
        TotalPrice:state.TotalPrice-IngredientPrice[action.ingredientType],
        purchaseFlag:updatePurchaseState(updateRemoveIngs),
    }
    return updateObject(updateRemoveIngs,updateRemoveState);
}

const SetIngredient = (state,action) => {
    const updateSetstate = { 
        burgerIngredient:{
            Salad:action.ingredientType.Salad,
            Meat:action.ingredientType.Meat,
            Cheese:action.ingredientType.Cheese,
            Bacon:action.ingredientType.Bacon,
        },
        TotalPrice:0,
        error:false,
        spinnerFlag:false,
        purchaseFlag:false,
    }
    return updateObject(state,updateSetstate);
}

const FetchIngredientFailed = (state,action) => {
    const updateFetchState ={
        error:true,
        spinnerFlag:true
    }
    return updateObject(state,updateFetchState);
}
const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionType.AddIngredient:return AddIngredient(state,action)
        case actionType.RemoveIngredient:return RemoveIngredient(state,action)
        case actionType.SetIngredient:return SetIngredient(state,action)
        case actionType.FetchIngredientFailed:return FetchIngredientFailed(state,action)
        default:
            return state;
    }
}

export default reducer ;