import { AnyAction } from "redux";
import { NotificationModel } from "../models/Notification";

interface NotificationsState {
  inbox: boolean;
  loading: boolean;
  news: boolean;
  byId: {
    [key: number]: NotificationModel;
  };
  all: number[];
}

export const ActionTypes = {
  MERGE_NOTIFICATIONS_REQUEST: "@@app/MERGE_NOTIFICATIONS_REQUEST",
  MERGE_NOTIFICATIONS_SUCCESS: "@@app/MERGE_NOTIFICATIONS_SUCCESS",
  MERGE_NOTIFICATIONS_FAILURE: "@@app/MERGE_NOTIFICATIONS_FAILURE",
  NEW_NOTIFICATIONS: "@@app/NEW_NOTIFICATIONS",
  MARK_SEEN: "@@app/MARK_SEEN",
  TOGGLE_INBOX: "@@app/TOGGLE_INBOX"
};

const initialState: NotificationsState = {
  inbox: false,
  loading: false,
  news: false,
  byId: {},
  all: []
};

const notificationReducer = (
  state = initialState,
  action: AnyAction
): NotificationsState => {
  switch (action.type) {
    case ActionTypes.MERGE_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.MERGE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        byId: {
          ...state.byId,
          ...action.byId
        },
        all: [...state.all, ...action.all]
      };
    case ActionTypes.MERGE_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false
      };
    case ActionTypes.MARK_SEEN:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.id]: {
            ...state.byId[action.id],
            seen: true
          }
        }
      };
    case ActionTypes.NEW_NOTIFICATIONS:
      return {
        ...state,
        news: action.news
      };
    case ActionTypes.TOGGLE_INBOX:
      return {
        ...state,
        inbox: !state.inbox
      };
    default:
      return state;
  }
};

export default notificationReducer;
