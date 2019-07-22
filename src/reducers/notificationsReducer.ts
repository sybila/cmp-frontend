import { AnyAction } from "redux";
import { NotificationModel } from "../models/Notification";

interface NotificationsState {
  loading: boolean;
  byId: {
    [key: number]: NotificationModel;
  };
  all: number[];
}

export const ActionTypes = {
  MERGE_NOTIFICATIONS_REQUEST: "@@app/MERGE_NOTIFICATIONS_REQUEST",
  MERGE_NOTIFICATIONS_SUCCESS: "@@app/MERGE_NOTIFICATIONS_SUCCESS",
  MERGE_NOTIFICATIONS_FAILURE: "@@app/MERGE_NOTIFICATIONS_FAILURE",
  MARK_SEEN: "@@app/MARK_SEEN"
};

const initialState: NotificationsState = {
  loading: false,
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
    default:
      return state;
  }
};

export default notificationReducer;
