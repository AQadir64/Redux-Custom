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
  if (action.type === "ADD_TODO") {
    state.concat([action.todo]);
  }
  return state;
}

const store = createStore(todos);

store.subscribe(() => {
  console.log("The new state is :", store.getState);
});

store.subscribe(() => {
  console.log("The store changed", store.getState);
});
