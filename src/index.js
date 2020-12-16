import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
import { Router } from 'react-router-dom';
import { render } from 'react-dom';

import {
  initFacebookSdk,
  history,
} from "./utils/InitFacebookSDK";

initFacebookSdk().then(startApp);

const store = createStore(rootReducer);

function startApp() {
  render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
  );
}


// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
