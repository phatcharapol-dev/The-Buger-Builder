import * as actionType from './actionType';

export const authStart = () => {
    return {
        type:actionType.AuthStart,
    }
}

export const authSuccess = (token,localId) => {
    return {
        type:actionType.AuthSuccess,
        token:token,
        userId:localId
    }
}

export const authFail = (err) => {
    return {
        type:actionType.AuthFail,
        error:err
    }
}

export const logOut = () => {
    return {
        type:actionType.InitialLogOut
    }
}

export const logOutSucceed = () => {
    return {
        type:actionType.AuthLogOut
    }
}
export const checkTimeoutAuth = (expireMilisec) => {
    return {
        type:actionType.AuthCheckTimeout,
        expireMilisec:expireMilisec,
    }
}

export const auth = (email,password,isSignUp) => {
    return {
        type:actionType.AuthUser,
        email:email,
        password:password,
        isSignUp:isSignUp
    }
}

export const authCheckState = () => {
    return {
        type:actionType.AuthCheckState,
    }
}


export const SetAuthRedirectPath = (path) => {
    return {
        type:actionType.setAuthRedirectPath,
        path:path
    }
}