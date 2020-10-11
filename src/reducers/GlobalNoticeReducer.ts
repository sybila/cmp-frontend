import { AnyAction } from "redux";

import { MessageType } from "components/Message";
import { ActionTypes } from "ApplicationActionTypes";

export interface GlobalNoticeInterface {
  id: string | number;
  message: string;
  heading: string;
  type: MessageType;
  actions?: {
    onClick: () => void;
    caption: string;
  }[];
}

interface State {
  [key: string]: GlobalNoticeInterface;
}

const initialState = {};

const GlobalNoticeReducer = (
  state: State = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case ActionTypes.ADD_GLOBAL_NOTICE:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case ActionTypes.REMOVE_GLOBAL_NOTICE:
      const copy = { ...state };
      delete copy[action.payload.id];
      return copy;
    default:
      return state;
  }
};

export default GlobalNoticeReducer;
