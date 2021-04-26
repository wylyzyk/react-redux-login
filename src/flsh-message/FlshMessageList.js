import React from "react";
import FlshMessage from "./FlshMessage";
import { connect } from "react-redux";
import { removeFlshMessage } from "../store/action/flshMessageAction";

const FlshMessageList = props => {
  const flshMessage = props.messages.map(item => (
    <FlshMessage key={item.id} messages={item} removeFlshMessage = {props.removeFlshMessage} />
  ));
  return <div className="container">{flshMessage}</div>;
};

const mapStateToProps = state => {
  return {
    messages: state.flshMessageReducer,
  };
};
export default connect(mapStateToProps, { removeFlshMessage })(FlshMessageList);
