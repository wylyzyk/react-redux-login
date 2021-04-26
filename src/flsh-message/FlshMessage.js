import React from "react";
import classNames from "classnames";

const FlshMessage = props => {
  const onClick = () => {
    props.removeFlshMessage(props.messages.id);
  }
  const { type, text } = props.messages;
  return (
    <div
      className={classNames("alert", {
        "alert-success": type === "success",
        "alert-danger": type === "failed",
      })}
    >
      <span>{text}</span>
      <button className="close" onClick={onClick}>&times;</button>
    </div>
  );
};

export default FlshMessage;
