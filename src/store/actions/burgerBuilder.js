import * as actionType from './actionType';
import axios from '../../axios-orders';
export const addIngredient = (name) => {
    return {
        type:actionType.AddIngredient,
        ingredientType:name
    }
}
export const removeIngredient = (name) => {
    return {
        type:actionType.RemoveIngredient,
        ingredientType:name
    }
}
export const setIngredient = (ingredients) => {
    return {
        type:actionType.SetIngredient,
        ingredientType:ingredients
    }
}
export const fetchIngredientFailed = () => {
    return {
        type:actionType.FetchIngredientFailed,
    }
}

export const initialIngredient = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-d5025.firebaseio.com/ingredients.json')
        .then(res => {
            console.log(res);
            dispatch(setIngredient(res.data));
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchIngredientFailed());
        })
    }
}