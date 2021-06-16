import { AxiosPromise } from "axios";
import { ApiResponse } from "models/GenericTypes";
import React, { useState, useEffect, useRef, useCallback } from "react";

export enum ApiStates {
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
}

type CallbackType<T = any> = () => AxiosPromise<ApiResponse<T>>;

export const useApi = <T>(apiCallback: CallbackType<T>): [T, string] => {
  const latestApiCallback = useRef<CallbackType>();
  const [result, setResult] = useState<T | undefined>();
  const [state, setState] = useState(ApiStates.PENDING);

  const apiCall = useCallback(() => {
    apiCallback()
      .then(({ data: { data } }) => {
        setState(ApiStates.FULFILLED);
        setResult(data);
      })
      .catch(() => setState(ApiStates.REJECTED));
  }, []);

  if (apiCallback !== latestApiCallback.current) apiCall();

  useEffect(() => {
    latestApiCallback.current = apiCallback;
  });

  useEffect(apiCall, []);

  return [result, state];
};
