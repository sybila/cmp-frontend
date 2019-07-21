import { AnyAction } from "redux";
import { NotificationModel } from "../models/Notification";

interface NotificationsState {
  loading: boolean;
  byId: {
    [key: number]: NotificationModel;
  };
  all: NotificationModel[];
}

export const ActionTypes = {
  MERGE_NOTIFICATIONS_REQUEST: "@@app/MERGE_NOTIFICATIONS_REQUEST",
  MERGE_NOTIFICATIONS_SUCCESS: "@@app/MERGE_NOTIFICATIONS_SUCCESS",
  MERGE_NOTIFICATIONS_FAILURE: "@@app/MERGE_NOTIFICATIONS_FAILURE"
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
    default:
      return state;
  }
};

export default notificationReducer;
