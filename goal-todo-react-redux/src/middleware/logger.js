// custom middleware logger

export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("The action :", action);
  const result = next(action);
  console.log("the new state :", store.getState());
  console.groupEnd();
  return result;
};
