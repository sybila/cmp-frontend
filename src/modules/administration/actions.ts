import { Dispatch } from "redux";
import { ActionType } from "redux-promise-middleware";

import {
  ActionTypes as MainActionTypes,
  ToolbarItem
} from "./reducers/ToolbarReducer";
import { ActionTypes as NotificationActionTypes } from "./reducers/NotificationsReducer";
import api from "services/api";
import { notificationsNormalize } from "models/Notification";
import Config from "config";

const {
  MERGE_NOTIFICATIONS,
  NEW_NOTIFICATIONS,
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
      normalized.all.length > 0 && dispatch(newNotifications(true));
      return dispatch(success(normalized.byId, normalized.all));
    }

    // REVIEW: Optional refactoring based on final responses
    return api.notifications.load(id).then(
      (notifications: any) => {
        const normalized = notificationsNormalize(notifications);
        normalized.all.length > 0 && dispatch(newNotifications(true));

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
    return { type: `${MERGE_NOTIFICATIONS}_${ActionType.Pending}` };
  }

  function success(byId: any, all: number[]) {
    return {
      type: `${MERGE_NOTIFICATIONS}_${ActionType.Fulfilled}`,
      byId,
      all
    };
  }

  function failure() {
    return { type: `${MERGE_NOTIFICATIONS}_${ActionType.Rejected}` };
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

export function newNotifications(news: boolean) {
  return { type: NEW_NOTIFICATIONS, news };
}

export function markAsSeen(id: number) {
  // TODO: Any additional API request
  return { type: MARK_SEEN, id };
}

export function toggleInbox() {
  return { type: TOGGLE_INBOX };
}

export const addToolbarItems = (id: string, items: ToolbarItem[]) => ({
  type: MainActionTypes.MERGE_TOOLBAR_ITEMS,
  id,
  items
});
