import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return(
    <div className="row">
      <div className="col-sm-3"></div>
      <div className="col-sm-6">
        <LoginForm />
      </div>
      <div className="col-sm-3"></div>
    </div>
  );
}

export default LoginPage;
