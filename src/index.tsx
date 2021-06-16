import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import ApplicationStore from "./ApplicationStore";
import * as serviceWorker from "utils/serviceWorker";

import Application from "./Application";

ReactDOM.render(
  <Provider store={ApplicationStore}>
    <Application />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
