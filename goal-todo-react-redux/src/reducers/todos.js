import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from "../actions/todos";
import { RECIEVE_DATA } from "../actions/shared";

export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((val) => {
        return val.id !== action.id;
      });
    case TOGGLE_TODO:
      return state.map((val) => {
        return val.id !== action.id
          ? val
          : Object.assign({}, val, { completed: !val.completed });
      });
    case RECIEVE_DATA:
      return action.todos;
    default:
      return state;
  }
}
