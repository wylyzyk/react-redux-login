import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, logout } from "../../store/action/login";

/**
 * TODO: logout 时, 导航栏不能朓转到, sign up 和 sign in
 */
const NavgationBar = ({ auth, logout }) => {
  const logoutClick = e => {
    e.preventDefault();
    logout();
  };
  const userLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" onClick={logoutClick}>
          logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/signup">
          Sign up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Login功能
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample05">
          {auth.isAuthenticated ? userLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logout })(NavgationBar);
