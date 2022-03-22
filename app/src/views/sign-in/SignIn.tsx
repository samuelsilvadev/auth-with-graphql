import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import AuthForm, { TOnSubmitValues } from "components/auth-form/AuthForm";
import { useHandleAuthErrors } from "components/auth-form/useHandleAuthErrors";
import { useDelayedLoading } from "hooks/useDelayedLoading";
import { useAuth } from "state/auth/AuthContext";
import { GET_USER_QUERY } from "state/auth/useGetLoggedInUser";

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      email
    }
  }
`;

function SignIn() {
  const [signIn, { loading: signLoading }] = useMutation(SIGN_IN_MUTATION);
  const { saveUserCredentials } = useAuth();
  const navigate = useNavigate();

  const loading = useDelayedLoading(signLoading);
  const { errors, catchError, cleanErrors } = useHandleAuthErrors();

  const handleSubmit = ({ email, password }: TOnSubmitValues) => {
    cleanErrors();

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
      .catch(catchError);
  };

  return (
    <>
      <Heading as="h1" marginBlockEnd="4">
        Sign in
      </Heading>
      <AuthForm
        onSubmit={handleSubmit}
        submitLoading={loading && !errors}
        submitText="Sign in"
        errors={errors}
      />
    </>
  );
}

export default SignIn;
