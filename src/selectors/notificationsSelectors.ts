import { AppState } from "../reducers/globalReducer";

export const getNotificationsById = (state: AppState) =>
  state.notifications.all.map(i => state.notifications.byId[i]);
