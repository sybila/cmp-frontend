import { Dispatch } from "redux";

import { ActionTypes as NotificationActionTypes } from "../reducers/notificationsReducer";
import notificationService from "../services/notificationServices";
import { NotificationModel } from "../models/Notification";
import Config from "../config";

const {
  MERGE_NOTIFICATIONS_REQUEST,
  MERGE_NOTIFICATIONS_FAILURE,
  MERGE_NOTIFICATIONS_SUCCESS
} = NotificationActionTypes;

export function loadNotifications(id: number) {
  return (dispatch: Dispatch) => {
    dispatch(request());

    // REVIEW: Optional refactoring based on final responses
    return notificationService.load(id).then(
      (notification: NotificationModel) => {
        dispatch(success(notification));
        return notification;
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

  function success(notification: NotificationModel) {
    return { type: MERGE_NOTIFICATIONS_FAILURE, notification };
  }

  function failure() {
    return { type: MERGE_NOTIFICATIONS_SUCCESS };
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
