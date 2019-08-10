/**
 * typeGenerator - generates action types for redux flow
 */
export const typeGenerator = (name: string, type: string) =>
  `${name !== "" ? `@@${name}/` : ""}${type}`;

/**
 * actionCreatorGenerator - generates action creator based on provided object
 */
export const actionCreatorGenerator = (type, ...argNames) => {
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
};

/**
 * actionHandlerGenerator - generates action handlers for reducer
 */
export const actionHandlerGenerator = (name: string, actionHandler) =>
  Object.keys(actionHandler).reduce((result, key) => {
    const actionType = typeGenerator(name, key);
    result[actionType] = actionHandler[key];
    return result;
  }, {});

/**
 * reducerGenerator - generates reducer based on action handlers
 */
export const reducerGenerator = (
  name = "",
  defaultActionHandler,
  initialState
) => {
  const actionHandler = actionHandlerGenerator(name, defaultActionHandler);

  return (state = initialState, action) =>
    actionHandler[action.type]
      ? actionHandler[action.type](state, action)
      : state;
};
