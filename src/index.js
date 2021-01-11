import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render } from 'react-dom';
import {initFacebookSdk} from "./utils/InitFacebookSDK";


initFacebookSdk().then(startApp);

const store = createStore(()=>{});

// localStorage.setItem("sort","1")
// localStorage.setItem("sortGender","All")


function startApp() {
  render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
  );
}
