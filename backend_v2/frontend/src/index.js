import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import csrfFetch, { restoreCSRF } from "./store/csrf";
import { login, logout, signup, restoreSession } from './store/sessionSlice';

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.login = login;
  window.logout = logout;
  window.signup = signup;
  window.restoreSession = restoreSession;
}

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
};

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(renderApp);
} else {
  renderApp();
}
