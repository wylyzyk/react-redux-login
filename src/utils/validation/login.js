import validator from "validator";
import isEmpty from "loadsh/isEmpty";

const validatorInput = data => {
  const errors = {};

  if(validator.isEmpty(data.username)) {
    errors.username = "please input username";
  }
  if(validator.isEmpty(data.passwd)) {
    errors.passwd = "please input password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default validatorInput;