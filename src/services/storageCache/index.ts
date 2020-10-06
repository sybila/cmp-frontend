import { userObservers, userStore } from "./user";

const observers = [userObservers];
const storeConstructors = [userStore];

export const registerObservers = (store) => {
  for (const group of observers) {
    for (const name in group) {
      const observer = group[name];
      observer(store);
    }
  }
};

export const constructInitialStore = (store) => {
  for (const group of storeConstructors) {
    for (const name in group) {
      const construct = group[name];
      construct(store);
    }
  }
};

export { default as userCache } from "./user";
