import { AppState } from "../reducers/globalReducer";

export const getNotifications = (state: AppState) =>
  state.notifications.all.map(i => state.notifications.byId[i]);

export const inboxState = (state: AppState) => state.notifications.inbox;
