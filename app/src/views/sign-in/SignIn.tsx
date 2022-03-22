import { ApolloError, gql, useMutation } from "@apollo/client";
import AuthForm, { TOnSubmitValues } from "components/auth-form/AuthForm";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "state/auth/AuthContext";
import { GET_USER_QUERY } from "state/auth/useGetLoggedInUser";

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      email
    }
  }
`;

const ERRORS_TIMER_DURATION = 500;

function SignIn() {
  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION);
  const { saveUserCredentials } = useAuth();
  const navigate = useNavigate();
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

  const handleSubmit = ({ email, password }: TOnSubmitValues) => {
    window.clearTimeout(setErrorTimerIdRef.current);
    setErrors(undefined);

    signIn({
      variables: {
        email,
        password,
      },
      refetchQueries: [
        {
          query: GET_USER_QUERY,
          variables: {
            email,
            password,
          },
        },
      ],
    })
      .then(() => {
        saveUserCredentials(email, password);
        navigate("/");
      })
      .catch((error) => {
        setErrorTimerIdRef.current = window.setTimeout(() => {
          const safeError = error as ApolloError;
          const errorMessages = safeError.graphQLErrors.map(
            (error) => error.message
          );

          setErrors(errorMessages);
        }, ERRORS_TIMER_DURATION);
      });
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      submitLoading={loading && !errors}
      submitText="Sign in"
      errors={errors}
    />
  );
}

export default SignIn;
