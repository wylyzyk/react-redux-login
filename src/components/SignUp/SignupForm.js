import React from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

class SignupForm extends React.Component {
  // const [username, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [passwd, setPasswd] = useState("");
  // const [passwdConfirmation, setPasswdConfirmation] = useState("");
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      passwd: "",
      passwdConfirmation: "",
      errors: {},
      isLoading: false,
      invaild: false,
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    // 阻止默认事件 跳转
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.signupActions.userSignupRequest(this.state).then(
      () => {
        this.props.flshActions.FlshMessage({
          type: "success",
          text: "success! please login in",
        });
        this.props.history.push("/");
      },
      ({ response }) => {
        this.setState({
          errors: response.data,
          isLoading: false,
        });
      }
    );
  };

  checkUserExist = e => {
    const field = e.target.name;
    const values = e.target.value;
    if (values !== "") {
      this.props.signupActions.isUserExist(values).then(res => {
        let errors = this.state.errors;
        let invaild;
        if (res.data[0]) {
          errors[field] = "用户名已存在" + values;
          invaild = true;
        } else {
          errors[field] = "";
          invaild = false;
        }
        this.setState({ errors, invaild });
      });
    }
  };

  render() {
    const { errors, isLoading, invaild } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community</h1>
        <div className="form-group">
          <label className="control-label">username</label>
          <input
            type="text"
            name="username"
            value={this.username}
            className={classNames("form-control", {
              "is-invalid": errors.username,
            })}
            onChange={this.onChange}
            onBlur={this.checkUserExist}
          />
          {errors.username && (
            <span className="form-text text-muted">{errors.username}</span>
          )}
        </div>
        <div className="form-group">
          <label className="control-label">email</label>
          <input
            type="email"
            name="email"
            value={this.email}
            className={classNames("form-control", {
              "is-invalid": errors.email,
            })}
            onChange={this.onChange}
          />
          {errors.email && (
            <span className="form-text text-muted">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label className="control-label">password</label>
          <input
            type="password"
            name="passwd"
            value={this.passwd}
            className={classNames("form-control", {
              "is-invalid": errors.passwd,
            })}
            onChange={this.onChange}
          />
          {errors.passwd && (
            <span className="form-text text-muted">{errors.passwd}</span>
          )}
        </div>
        <div className="form-group">
          <label className="control-label">passwdConfirmation</label>
          <input
            type="password"
            name="passwdConfirmation"
            value={this.passwdConfirmation}
            className={classNames("form-control", {
              "is-invalid": errors.passwdConfirmation,
            })}
            onChange={this.onChange}
          />
          {errors.passwdConfirmation && (
            <span className="form-text text-muted">
              {errors.passwdConfirmation}
            </span>
          )}
        </div>
        <div className="form-group">
          <button
            disabled={isLoading || invaild}
            className="btn btn-lg btn-primary"
          >
            sign up
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SignupForm);
