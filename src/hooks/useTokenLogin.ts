import { useDispatch, useSelector } from "react-redux";
import { isEqual } from "lodash";

import { getUser } from "ApplicationSelectors";
import { checkUserConfirmation, fetchCurrentUser } from "ApplicationActions";
import { history } from "Application";
import { userCookies } from "services/cookies";
import { useEffect } from "react";

export const useTokenLogin = (location: any) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser, isEqual);

  const token = userCookies.getAuthToken();

  useEffect(() => {
    const attemptTokenLogin = async (from: string) => {
      try {
        await dispatch(fetchCurrentUser());
        history.push(from);
      } catch (e) {
        console.error(e);
      }
    };

    if (token && !user) {
      const from = location.state ? location.state.from.pathname : "/";
      attemptTokenLogin(from);
    }

    checkUserConfirmation(dispatch, user);
  }, [user, location]);
};
