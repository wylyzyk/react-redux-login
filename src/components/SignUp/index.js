import React from "react";
import SignUpForm from "./SignupForm";
import * as signupActions from "../../store/action/SignupAction";
import * as flshActions from "../../store/action/flshMessageAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class SignUp extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <SignUpForm signupActions={this.props.signupActions} flshActions={this.props.flshActions} />
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signupActions: bindActionCreators(signupActions, dispatch),
    flshActions: bindActionCreators(flshActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
