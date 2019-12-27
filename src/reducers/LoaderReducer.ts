import { AnyAction } from "redux";

import { ActionTypes } from "ApplicationActionTypes";

interface State {
  show: number,
  pending: {
    [key: string]: boolean
  }
}

const initialState = {
  show: 0,
  pending: {}
};

const LoaderReducer = (state: State = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.ADD_REQUEST:
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.requestName]: true
        }
      }
    case ActionTypes.SHOW_LOADER:
      return {
        ...state,
        show: state.show + 1
      };
    case ActionTypes.HIDE_LOADER:
      let pending = state.pending;
      if (action.requestName && Object.keys(state.pending).length > 0) {
        const { [`${action.requestName}`]: value, ...newPending } = state.pending;
        pending = newPending;
      }
      
      return {
        ...state,
        show: state.show > 0 ? state.show - 1 : 0,
        pending
      };
    default:
      return state;
  }
};

export default LoaderReducer;
