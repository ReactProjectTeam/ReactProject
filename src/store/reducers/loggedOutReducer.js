import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";


const loggedOutReducer=(state= initialState.loggedOut, action)=>{

    switch (action.type) {
        case actionTypes.LOGGEDOUT:
            return action.payload
        default:
            return state
    }
}

export default loggedOutReducer;


