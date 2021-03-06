import * as actionType from '../actions/actionType';
import {updateObject} from '../../shared/utility';


const initialState = {
    token:null,
    userId:null,
    spinnerFlag:false,
    error:null,
    authRedirectPath:'/'
}

const AuthStart = (state,action) => {
    return updateObject(state,{error:null,spinnerFlag:true})
}
const AuthSuccess = (state,action) => {
    const updateState = {
        token:action.token,
        userId:action.userId,
        spinnerFlag:false,
        error:null
    }
    return updateObject(state,updateState);
}
const AuthFail = (state,action) => {
    return updateObject(state,{error:action.error,spinnerFlag:false})
}
const AuthLogOut = (state,action) => {
    return updateObject(state,{token:null,userId:null});
}
const setAuthRedirectPath = (state,action) => {
    return updateObject(state,{authRedirectPath:action.path})
}

const reducer = (state=initialState,action) =>{
    switch (action.type) {
        case actionType.AuthStart:return AuthStart(state,action);
        case actionType.AuthSuccess:return AuthSuccess(state,action);
        case actionType.AuthFail:return AuthFail(state,action);
        case actionType.AuthLogOut:return AuthLogOut(state,action);
        case actionType.setAuthRedirectPath:return setAuthRedirectPath(state,action);
        default:return state;
    }
}

export default reducer ;