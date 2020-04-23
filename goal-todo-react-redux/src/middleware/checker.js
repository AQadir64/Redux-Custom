import { ADD_TODO } from "../actions/todos";
import { ADD_GOAL } from "../actions/goals";

export const checker = (store) => (next) => (action) => {
  if (action.type === ADD_TODO && action.todo.name.includes("bitcoin")) {
    return alert("Nope thats a bad idea...");
  }
  if (action.type === ADD_GOAL && action.goal.name.includes("bitcoin")) {
    return alert("Nope thats a bad idea...");
  }
  return next(action);
};
