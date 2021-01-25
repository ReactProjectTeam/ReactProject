import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { render } from 'react-dom';
import {initFacebookSdk} from "./utils/InitFacebookSDK";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./store/reducers"

const store = createStore(rootReducer)


initFacebookSdk().then(startApp);


function startApp() {
  render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
  );
}
