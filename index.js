// constants

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

function createStore(reducer) {
  //four parts of the store
  // 1) state of the store
  // 2) get the state
  // 3) listen to changes in state
  // 4) update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((listen) => {
        listen != listener;
      });
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listen) => {
      listen();
    });
  };

  return {
    getState,
    subscribe,
    dispatch,
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
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((val) => {
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
    goals: goals(state.goals, action),
  };
}

const store = createStore(app);

store.subscribe(() => {
  const { todos, goals } = store.getState();

  document.querySelector("#todos").innerHTML = "";
  document.querySelector("#goals").innerHTML = "";

  todos.forEach(addTodoToDom);
  goals.forEach(addGoalToDom);
});

// store.subscribe(() => {
//   console.log("The store changed", store.getState());
// });

// action functions

addTodoAction = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  };
};

removeTodoAction = (id) => {
  return {
    type: REMOVE_TODO,
    id,
  };
};
toggleTodoAction = (id) => {
  return {
    type: TOGGLE_TODO,
    id,
  };
};
addGoalAction = (goal) => {
  return {
    type: ADD_GOAL,
    goal,
  };
};
removeGoalAction = (id) => {
  return {
    type: REMOVE_GOAL,
    id,
  };
};

/// testing commands

// store.dispatch(addTodoAction({ id: 0, name: "learn redux", completed: true }));

// store.dispatch(addTodoAction({ id: 1, name: "do homework", completed: true }));

// store.dispatch(addTodoAction({ id: 2, name: "wash car", completed: false }));

// store.dispatch(toggleTodoAction(1));

// store.dispatch(removeTodoAction(2));

// store.dispatch(addGoalAction({ id: 0, name: "Babusoft web" }));

// store.dispatch(addGoalAction({ id: 1, name: "I QAZA APP" }));

// store.dispatch(addGoalAction({ id: 2, name: "PROJECT Z" }));

// store.dispatch(removeTodoAction(2));

//////////////////////////////////////////////////
////// ramdon id generator
//////////////////////////////////////////////////

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/////////////////////////////////////////
// Dom working
////////////////////////////////////////

const todoBtn = document.querySelector("#todoBtn");
const goalBtn = document.querySelector("#goalBtn");

const addTodo = () => {
  const input = document.querySelector("#todo");
  const name = input.value;
  input.value = "";

  store.dispatch(
    addTodoAction({
      name,
      completed: false,
      id: makeid(5),
    })
  );
};

const addGoal = () => {
  const input = document.querySelector("#goal");
  const name = input.value;
  input.value = "";

  store.dispatch(
    addGoalAction({
      name,
      id: makeid(5),
    })
  );
};

todoBtn.addEventListener("click", addTodo);
goalBtn.addEventListener("click", addGoal);

const createRemoveBtn = (onClick) => {
  const remBtn = document.createElement("button");
  remBtn.innerHTML = "X";
  remBtn.addEventListener("click", onClick);
  return remBtn;
};

const addTodoToDom = (todo) => {
  const node = document.createElement("li");
  const text = document.createTextNode(todo.name);
  node.style.textDecoration = todo.completed ? "line-through" : "none";
  const remBtn = createRemoveBtn(() => {
    store.dispatch(removeTodoAction(todo.id));
  });
  node.addEventListener("click", () => {
    store.dispatch(toggleTodoAction(todo.id));
  });
  node.appendChild(text);
  node.appendChild(remBtn);
  const todos = document.querySelector("#todos");
  todos.append(node);
};

const addGoalToDom = (goal) => {
  const node = document.createElement("li");
  const text = document.createTextNode(goal.name);
  const remBtn = createRemoveBtn(() => {
    store.dispatch(removeGoalAction(goal.id));
  });
  node.appendChild(text);
  node.appendChild(remBtn);
  const goals = document.querySelector("#goals");
  goals.append(node);
};
