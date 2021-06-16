/**
 * Utility function to create observer for
 * specific part of store.
 */
export const observeStore = (store, select, onChange) => {
  let currentState;

  const handleChange = () => {
    const nextState = select(store.getState());
    if (nextState != currentState) {
      const prevState = currentState;
      currentState = nextState;
      onChange(currentState, store.dispatch.bind(store), prevState);
    }
  };

  const unsubscribe = store.subscribe(handleChange);
  return unsubscribe;
};
