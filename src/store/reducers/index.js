import {combineReducers} from "redux";
import loggedOutReducer from "./loggedOutReducer";
import loggedInReducer from "./loggedInReducer";

const rootReducer = combineReducers({
    loggedOutReducer,
    loggedInReducer,
})

export default rootReducer;
