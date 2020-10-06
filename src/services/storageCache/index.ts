import { userObservers } from "./user";

const observers = [userObservers];

export const registerObservers = (store) => {
  for (const group of observers) {
    for (const name in group) {
      const observer = group[name];
      observer(store);
    }
  }
};

export { default as userCache } from "./user";
