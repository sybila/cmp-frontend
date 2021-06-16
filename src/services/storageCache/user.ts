import { UserModel } from "models/User";
import session from "./session";
import { observeStore } from "./observer";
import { getUser } from "ApplicationSelectors";

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

export default {
  user,
};
