import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FlshMessage } from "../store/action/flshMessageAction";

export default (ComposedComponent) => {
  const Authenticate = props => {

    React.useEffect(() => {
      if(!props.isAuthenticated) {
        props.FlshMessage({
          type: "failed",
          text: "please login"
        });
        props.history.push("/login");
      }
    }, [props]);

    return <ComposedComponent {...props} />;
  };

  const mapStateToProps = state => {
    return {
      isAuthenticated: state.isAuthenticated,
    };
  };

  return withRouter(connect(mapStateToProps, { FlshMessage })(Authenticate));
}
