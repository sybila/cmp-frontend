/**
 *  Basic set of redux generators, easily extendable. It helps reducing redux
 *  boilerplate and helps reusability as well. Should be used throughout the app.
 */

/**
 * typeGenerator - generates action types for redux flow
 */
export const typeGenerator = (name: string, type: string) =>
  `${name !== "" ? `${name}/` : ""}${type}`;

/**
 * actionCreatorGenerator - generates action creator based on provided object
 */
export const actionCreatorGenerator = (name: string, actionCreators, params) =>
  Object.keys(actionCreators).reduce((result, key) => {
    result[key] = actionCreators[key](name, params);
    return result;
  }, {});

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
