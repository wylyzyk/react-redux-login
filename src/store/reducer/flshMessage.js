import { ADD_FLSH_MESSAGE, REMOVE_FLSH_MESSAGE } from "../constant";
import { nanoid } from "nanoid";
import findIndex from "loadsh/findIndex";

const FlshMessageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FLSH_MESSAGE:
      return [
        ...state,
        {
          id: nanoid(),
          type: action.message.type,
          text: action.message.text,
        },
      ];
    case REMOVE_FLSH_MESSAGE:
      // findIndex 在一个数组种, 返回当前查找元素的位置
      const index = findIndex(state, { id: action.id});
      if(index > 0) {
        return [
          // 先取出元素, 再解构数组, 然后再将取出的元素, 放到新的数组种
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ]
      }
      console.log(...state)
      return state;
    default:
      return state;
  }
};

export default FlshMessageReducer;
