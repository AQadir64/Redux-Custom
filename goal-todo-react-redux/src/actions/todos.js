import API from "goals-todos-api";
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  };
};

const removeTodo = (id) => {
  return {
    type: REMOVE_TODO,
    id,
  };
};
const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};

export const handleAddTodo = (name, cb) => {
  return (dispatch) => {
    API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodo(todo));
        cb();
      })
      .catch(() => {
        alert("error occured in adding todo");
      });
  };
};

export const handleDeleteTodo = (todo) => {
  return (dispatch) => {
    dispatch(removeTodo(todo.id));
    API.deleteTodo(todo.id).catch(() => {
      dispatch(addTodo(todo));
      alert("error occured in deletation...");
    });
  };
};

export const handleToggle = (id) => {
  return (dispatch) => {
    dispatch(toggleTodo(id));
    API.saveTodoToggle(id).catch(() => {
      dispatch(toggleTodo(id));
      alert("error occured in toggling...");
    });
  };
};
