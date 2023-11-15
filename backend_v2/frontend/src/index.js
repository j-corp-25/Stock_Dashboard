import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
