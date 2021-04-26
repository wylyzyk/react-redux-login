import axios from "axios";

const setAuthOrizationToken = token => {
  if(token) {
    axios.defaults.headers.common["Authorization"] = `Owen ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default setAuthOrizationToken;