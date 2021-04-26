import React, { useState, useCallback } from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../store/action/login";
import validatorInput from "../../utils/validation/login";

const LoginForm = ({ login, history }) => {
  const [username, setUsername] = useState("");
  const [passwd, setPasswd] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isValid = () => {
    const { errors, isValid } = validatorInput({ username, passwd });
    if (!isValid) {
      setErrors(errors);
    }
    return isValid;
  };

  const onSubmit = e => {
    e.preventDefault();
    if (isValid()) {
      setIsLoading(true);
      setErrors({});
      login({ username, passwd, errors, isLoading }).then(
        res => history.push("/"),
        err => {
          setErrors(err.response.data.errors);
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>
      {errors.from && <div className="alert alert-danger">⚠ {errors.from}</div>}
      <div className="form-group">
        <label className="control-label">Username</label>
        <input
          className={classNames("form-control", {
            "is-invalid": errors.username,
          })}
          type="text"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {errors.username && (
          <span className="form-text text-muted">{errors.username}</span>
        )}
      </div>
      <div className="form-group">
        <label className="control-label">Password</label>
        <input
          className={classNames("form-control", { "is-invalid": errors.passwd })}
          type="password"
          name="passwd"
          value={passwd}
          onChange={e => setPasswd(e.target.value)}
        />
        {errors.passwd && (
          <span className="form-text text-muted">{errors.passwd}</span>
        )}
      </div>
      <div className="form-group">
        <button disabled={isLoading} className="btn btn-lg btn-primary">
          login
        </button>
      </div>
    </form>
  );
};

export default withRouter(connect(null, { login })(LoginForm));
