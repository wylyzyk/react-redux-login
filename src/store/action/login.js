import axios from "axios";
import jwtDecode from "jwt-decode";   // 解析token
import setAuthOrizationToken from "../../utils/setAuthOrizationToken";
import { SET_CURRENT_USER } from "../constant";

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    // 清除请求头中的数据
    setAuthOrizationToken(false);
    // remove date in redux
    dispatch(setCurrentUser({}));
  }
}

export const login = data => {
  return dispatch => {
    return axios.post("/api/auth", data).then(res => {
      const token = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthOrizationToken(token);
      setCurrentUser(jwtDecode(token));
    });
  }
}