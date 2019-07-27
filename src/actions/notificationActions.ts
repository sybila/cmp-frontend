import { Dispatch } from "redux";

import { ActionTypes as NotificationActionTypes } from "../reducers/notificationsReducer";
import notificationService from "../services/notificationServices";
import {
  NotificationModel,
  notificationsNormalize
} from "../models/Notification";
import Config from "../config";

const {
  MERGE_NOTIFICATIONS_REQUEST,
  MERGE_NOTIFICATIONS_FAILURE,
  MERGE_NOTIFICATIONS_SUCCESS,
  MARK_SEEN,
  TOGGLE_INBOX
} = NotificationActionTypes;

export function loadNotifications(id: number) {
  return (dispatch: Dispatch) => {
    dispatch(request());

    // TEMP: Mock data, remove
    if (id === 99) {
      const test = [
        {
          id: Math.floor(Math.random() * 1000) + 1,
          message: "New notification, hello there, hello world, hello everyone",
          seen: false
        }
      ];
      const normalized = notificationsNormalize(test);
      return dispatch(success(normalized.byId, normalized.all));
    }

    // REVIEW: Optional refactoring based on final responses
    return notificationService.load(id).then(
      (notifications: any) => {
        const normalized = notificationsNormalize(notifications);

        dispatch(success(normalized.byId, normalized.all));
        return normalized.byId;
      },
      (error: any) => {
        dispatch(failure());
        return Promise.reject(error);
      }
    );
  };

  function request() {
    return { type: MERGE_NOTIFICATIONS_REQUEST };
  }

  function success(byId: any, all: number[]) {
    return { type: MERGE_NOTIFICATIONS_SUCCESS, byId, all };
  }

  function failure() {
    return { type: MERGE_NOTIFICATIONS_FAILURE };
  }
}

// TODO: Implement sheluded notification reload initialization on login
export function loadNotificationsSheluded(id: number) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch<any>(loadNotifications(id));
    }, Config.notificationReload);
  };
}

export function markAsSeen(id: number) {
  // TODO: Any additional API request
  return { type: MARK_SEEN, id };
}

export function toggleInbox() {
  return { type: TOGGLE_INBOX };
}
