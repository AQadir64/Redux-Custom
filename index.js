function createStore(reducer) {
  //four parts of the store
  // 1) state of the store
  // 2) get the state
  // 3) listen to changes in state
  // 4) update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(listen => {
        listen != listener;
      });
    };
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listen => {
      listen();
    });
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

// to increse the predictability of the state we have to set sort of rules for this
// 1) only an event can change the state of store
// object with the type property is known as event and also called actions that have played
// {
//   type: "ADD_TODO",
//   todo : {
//       id : 4,
//       description : "Hello world"
//   }
// }
// {
//   type: "REMOVE_TODO",
//   id : 4
// }
// The type property is set as action of the todo event
// When an event takes place in a Redux application, we use a plain JavaScript object to keep track of what the specific event was.
// This object is called an Action.
// 2) the function that return the new state must be a pure function
// the most important part of the pure function are that they are predictable

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo]);
    case "REMOVE_TODO":
      return state.filter(val => {
        return val.id !== action.id;
      });
    case "TOGGLE_TODO":
      return state.map(val => {
        return val.id !== action.id
          ? val
          : Object.assign({}, val, { completed: !val.completed });
      });
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case "ADD_GOAL":
      return state.concat([action.goal]);
    case "REMOVE_GOAL":
      return state.filter(val => {
        return val.id !== action.id;
      });
    default:
      return state;
  }
}

function app(state = {}, action) {
  console.log(state);
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
}

const store = createStore(app);

store.subscribe(() => {
  console.log("The new state is :", store.getState());
});

// store.subscribe(() => {
//   console.log("The store changed", store.getState());
// });

/// testing commands

store.dispatch({
  type: "ADD_TODO",
  todo: { id: 0, name: "learn redux", completed: true }
});

store.dispatch({
  type: "ADD_TODO",
  todo: { id: 1, name: "do homework", completed: true }
});

store.dispatch({
  type: "ADD_TODO",
  todo: { id: 2, name: "wash car", completed: false }
});

store.dispatch({
  type: "REMOVE_TODO",
  id: 1
});

store.dispatch({
  type: "TOGGLE_TODO",
  id: 2
});

store.dispatch({
  type: "ADD_GOAL",
  goal: { id: 0, name: "Babusoft web" }
});

store.dispatch({
  type: "ADD_GOAL",
  goal: { id: 1, name: "I QAZA APP" }
});

store.dispatch({
  type: "ADD_GOAL",
  goal: { id: 2, name: "PROJECT Z" }
});

store.dispatch({
  type: "REMOVE_GOAL",
  id: 2
});
