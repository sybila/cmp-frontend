import { AnyAction } from "redux";
import { ActionType } from "redux-promise-middleware";

import { NotificationModel } from "models/Notification";
import { typeGenerator, reducerGenerator } from "utils/reduxGenerators";

interface NotificationsState {
  inbox: boolean;
  loading: boolean;
  news: boolean;
  byId: {
    [key: number]: NotificationModel;
  };
  all: number[];
  toBeDisplayed: number[];
}

const AdminNamespace = "module_administration"; // TODO: move somewhere else
export const ActionTypes = {
  MERGE_NOTIFICATIONS: typeGenerator(AdminNamespace, "MERGE_NOTIFICATIONS"),
  NEW_NOTIFICATIONS: typeGenerator(AdminNamespace, "NEW_NOTIFICATIONS"),
  MARK_SEEN: typeGenerator(AdminNamespace, "MARK_SEEN"),
  TOGGLE_INBOX: typeGenerator(AdminNamespace, "TOGGLE_INBOX"),
  MARK_DISPLAYED: typeGenerator(AdminNamespace, "MARK_DISPLAYED"),
};

const initialState: NotificationsState = {
  inbox: false,
  loading: false,
  news: false,
  byId: {},
  all: [],
  toBeDisplayed: [],
};

const actionHandler = {
  [`${ActionTypes.MERGE_NOTIFICATIONS}_${ActionType.Pending}`]: (
    state: NotificationsState,
    action: AnyAction
  ) => ({
    ...state,
    loading: true
  }),
  [`${ActionTypes.MERGE_NOTIFICATIONS}_${ActionType.Fulfilled}`]: (
    state: NotificationsState,
    action: AnyAction
  ) => ({
    ...state,
    loading: false,
    byId: {
      ...state.byId,
      ...action.byId
    },
    all: [...state.all, ...action.all],
    toBeDisplayed: [...state.toBeDisplayed, ...action.all]
  }),
  [`${ActionTypes.MERGE_NOTIFICATIONS}_${ActionType.Rejected}`]: (
    state: NotificationsState,
    action: AnyAction
  ) => ({
    ...state,
    loading: false
  }),
  [ActionTypes.MARK_SEEN]: (state: NotificationsState, action: AnyAction) => ({
    ...state,
    byId: {
      ...state.byId,
      [action.id]: {
        ...state.byId[action.id],
        seen: true
      }
    }
  }),
  [ActionTypes.MARK_DISPLAYED]: (state: NotificationsState, action: AnyAction) => {
    const index = state.toBeDisplayed.indexOf(action.id);

    if (index === -1) { 
      return state;
    }

    const newArray = [...state.toBeDisplayed];
    newArray.splice(index, 1);
    return {
      ...state,
      toBeDisplayed: newArray
    }
  },
  [ActionTypes.NEW_NOTIFICATIONS]: (
    state: NotificationsState,
    action: AnyAction
  ) => ({
    ...state,
    news: action.news
  }),
  [ActionTypes.TOGGLE_INBOX]: (state: NotificationsState, action: AnyAction) => ({
    ...state,
    inbox: !state.inbox
  })
};

const NotificationReducer = reducerGenerator(
  AdminNamespace,
  actionHandler,
  initialState
);

export default NotificationReducer;
