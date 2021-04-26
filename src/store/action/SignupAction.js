import axios from "axios";

export const userSignupRequest = userInfo => {
  // thunk
  return dispatch => {
    return axios.post("/api/user", userInfo);
  };
};

export const isUserExist = (username) => {
  return dispatch => {
    return axios.get(`/api/user`, {params:{username}});
  }
}