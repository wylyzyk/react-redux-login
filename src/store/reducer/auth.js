import { SET_CURRENT_USER } from "../constant";
import isEmpty from "loadsh/isEmpty";

const initState = {
  isAuthenticated: false,
  user: {},
};
export const auth = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    default:
      return state;
  }
};
