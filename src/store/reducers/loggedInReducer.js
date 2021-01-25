import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";


const loggedInReducer=(state= initialState.loggedIn, action)=>{

    switch (action.type) {
        case actionTypes.LOGGEDIN:
            return action.payload
        default:
            return state
    }
}

export default loggedInReducer;


