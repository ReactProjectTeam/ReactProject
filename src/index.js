import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import {initFacebookSdk} from "./utils/InitFacebookSDK";

initFacebookSdk().then(startApp);

const reducer=(state=[],action)=>{
    switch (action.type) {
        case "addProduct": {
            return [...state,action.payload]
        }
    }
    return state
}

const store = createStore(reducer);
store.subscribe(()=> console.log(store.getState()))


store.dispatch({type: "addProduct",payload:"kurtka"})
store.dispatch({type: "addProduct",payload:"shalvar"})

function startApp() {
  render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
  );
}
