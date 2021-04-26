import React from "react";
import { Route } from "react-router-dom";
import App from "../App";
import LoginPage from "../components/login/LoginPage";
import SignUp from "../components/SignUp";
import ShopPage from "../components/shop";
import requireAuth from "../utils/requireAuth";

export default (
  <div>
    <Route exact path="/" component={App}></Route>
    <Route path="/signup" component={SignUp}></Route>
    <Route path="/login" component={LoginPage}></Route>
    <Route path="/shop" component={requireAuth(ShopPage)}></Route>
  </div>
);
