import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import router from "./router";
import NavgationBar from "./components/NavgationBar";
import FlshMessageList from "./flsh-message/FlshMessageList";
import setAuthOrizationToken from "./utils/setAuthOrizationToken";
import { setCurrentUser } from "./store/action/login";
import jwtDecode from "jwt-decode";

if(localStorage.jwtToken) {
  setAuthOrizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter routes={router}>
      <NavgationBar />
      <FlshMessageList />
      {router}
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
