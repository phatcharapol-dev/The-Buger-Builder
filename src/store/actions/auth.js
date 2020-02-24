import * as actionType from './actionType';
import axios from 'axios';

const authStart = () => {
    return {
        type:actionType.AuthStart,
    }
}

const authSuccess = (token,localId) => {
    return {
        type:actionType.AuthSuccess,
        token:token,
        userId:localId
    }
}

const authFail = (err) => {
    return {
        type:actionType.AuthFail,
        error:err
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireDateTime');
    localStorage.removeItem('userId');
    return {
        type:actionType.AuthLogOut
    }
}

const checkTimeoutAuth = (expireMilisec) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        },expireMilisec*1000)
    } 
}


export const auth = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart()) ;
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
    
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJMa1MNyQHITxPvvLtVPC-4rxdWu8tC5A';
        if(isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJMa1MNyQHITxPvvLtVPC-4rxdWu8tC5A';
        }
        axios.post(url,authData)
        .then( res => {
            const expireDateTime = new Date(new Date().getTime()+res.data.expiresIn*1000) ;
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('expireDateTime',expireDateTime);
            localStorage.setItem('userId',res.data.localId)
            dispatch(authSuccess(res.data.idToken,res.data.localId));
            dispatch(checkTimeoutAuth(res.data.expiresIn));
        })
        .catch( error => {
            dispatch(authFail(error.response.data.error.message));
        })

    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logOut());
        }else {
           
            const expireDateTime = new Date(localStorage.getItem('expireDateTime')).getTime();
            if(expireDateTime < new Date().getTime() ){
                dispatch(logOut());
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId));
                dispatch(checkTimeoutAuth((expireDateTime-new Date().getTime())/1000));
            }
        }
    }
}