import * as actionTypes from "./actionTypes";

export const loggedOut =(boolean)=> {
    return {type: actionTypes.LOGGEDOUT, payload: boolean}
}

export const loggedIn =(boolean)=> {
    return {type: actionTypes.LOGGEDIN, payload: boolean}
}