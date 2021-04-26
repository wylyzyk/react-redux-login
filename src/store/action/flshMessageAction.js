import { 
  ADD_FLSH_MESSAGE,
  REMOVE_FLSH_MESSAGE
} from "../constant";

const FlshMessage = message => {
  return {
    type: ADD_FLSH_MESSAGE,
    message,
  };
};

const removeFlshMessage = id => {
  return {
    type: REMOVE_FLSH_MESSAGE,
    id
  }
}

export { FlshMessage, removeFlshMessage };
