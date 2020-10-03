import { useDispatch, useSelector } from "react-redux";
import { isEqual } from "lodash";

import { getUser } from "ApplicationSelectors";
import { tokenLogin } from "ApplicationActions";
import { history } from "Application";
import { userCookies } from "services/cookies";
import { useEffect } from "react";

interface LocationState {
  from?: {
    pathname: string;
  };
}

export const useTokenLogin = (location: any) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser, isEqual);

  const token = userCookies.getAuthToken();

  useEffect(() => {
    const attemptTokenLogin = async (from: string) => {
      try {
        await dispatch(tokenLogin(token));
        history.push(from);
      } catch (e) {
        console.error(e);
      }
    };

    if (token) {
      if (!user) {
        const from = location.state ? location.state.from.pathname : "/";
        attemptTokenLogin(from);
      }
    }
  }, [user, location]);
};
