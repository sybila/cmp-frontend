import { AxiosError, AxiosPromise } from "axios";
import { ApiResponse } from "models/GenericTypes";
import React, { useState, useEffect, useRef, useCallback } from "react";

export enum ApiStates {
  PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
}

type CallbackType<T = any, A extends unknown[] = []> = (
  ...args: A
) => AxiosPromise<ApiResponse<T>>;

const useGet = <T>(
  apiCallback: CallbackType<T, []>
): [T, string, VoidFunction] => {
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

  return [result, state, apiCall];
};

const usePost = <T, A extends any[]>(
  apiCallback: CallbackType<T, A>
): [(...args: A) => Promise<T | AxiosError<T>>, T, string] => {
  const [result, setResult] = useState<T | undefined>();
  const [state, setState] = useState(ApiStates.PENDING);

  const apiCall = useCallback(
    (...args: A) => {
      return apiCallback(...args)
        .then(({ data: { data } }) => {
          setState(ApiStates.FULFILLED);
          setResult(data);
          return data;
        })
        .catch((e: AxiosError<T>) => {
          setState(ApiStates.REJECTED);
          return e;
        });
    },
    [apiCallback]
  );

  return [apiCall, result, state];
};

const useApi = {
  useGet,
  usePost,
  usePut: usePost,
  useDelete: usePost,
};

export default useApi;
