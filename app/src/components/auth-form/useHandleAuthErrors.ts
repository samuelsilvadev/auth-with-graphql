import type { ApolloError } from "@apollo/client";
import { useEffect, useRef, useState } from "react";

const ERRORS_TIMER_DURATION = 500;

export function useHandleAuthErrors() {
  const [errors, setErrors] = useState<string[] | undefined>();
  const setErrorTimerIdRef = useRef<number | undefined>();

  useEffect(
    () => () => {
      if (setErrorTimerIdRef.current) {
        window.clearTimeout(setErrorTimerIdRef.current);
      }
    },
    []
  );

  const cleanErrors = () => {
    window.clearTimeout(setErrorTimerIdRef.current);
    setErrors(undefined);
  };

  const catchError = (error: unknown) => {
    setErrorTimerIdRef.current = window.setTimeout(() => {
      const safeError = error as ApolloError;
      const errorMessages = safeError.graphQLErrors.map(
        (error) => error.message
      );

      setErrors(errorMessages);
    }, ERRORS_TIMER_DURATION);
  };

  return {
    errors,
    cleanErrors,
    catchError,
  };
}
