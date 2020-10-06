import { UserModel } from "models/User";
import session from "./session";
import { observeStore } from "./observer";
import { getUser } from "ApplicationSelectors";
import { setUser } from "ApplicationActions";

const USER_CACHE_NAME = "user";

const user = {
  set(user: UserModel) {
    session.set("SESSION", USER_CACHE_NAME, user);
  },

  get(): UserModel {
    return session.get("SESSION", USER_CACHE_NAME);
  },

  remove() {
    session.remove("SESSION", USER_CACHE_NAME);
  },

  constructStore(store) {
    const userCache = user.get();
    userCache && store.dispatch(setUser(user.get()));
  },

  observe(store) {
    observeStore(store, getUser, (userStore: UserModel) => {
      if (userStore)
        setTimeout(() => {
          user.set(userStore);
        });
    });
  },
};

export const userObservers = {
  user: user.observe,
};

export const userStore = {
  user: user.constructStore,
};

export default {
  user,
};
