import { AppState } from "reducers/GlobalReducer";

export const getNotifications = (state: AppState) =>
  state.module_administration.notifications.all.map(
    i => state.module_administration.notifications.byId[i]
  );

export const inboxState = (state: AppState) =>
  state.module_administration.notifications.inbox;
export const hasNews = (state: AppState) =>
  state.module_administration.notifications.news;
