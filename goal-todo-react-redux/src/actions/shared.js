import API from "goals-todos-api";
export const RECIEVE_DATA = "RECIEVE_DATA";

const recieveDataAction = (todos, goals) => {
  return {
    type: RECIEVE_DATA,
    todos,
    goals,
  };
};

export const appInitialData = () => {
  return (dispatch) => {
    Promise.all([API.fetchTodos(), API.fetchGoals()]).then(([todos, goals]) => {
      dispatch(recieveDataAction(todos, goals));
    });
  };
};
