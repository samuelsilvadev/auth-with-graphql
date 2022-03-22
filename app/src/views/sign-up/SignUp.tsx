import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import AuthForm, { TOnSubmitValues } from "components/auth-form/AuthForm";
import { useHandleAuthErrors } from "components/auth-form/useHandleAuthErrors";
import { useAuth } from "state/auth/AuthContext";
import { GET_USER_QUERY } from "state/auth/useGetLoggedInUser";
import { useDelayedLoading } from "hooks/useDelayedLoading";

const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      email
    }
  }
`;

function SignUp() {
  const [signUp, { loading: signUpLoading }] = useMutation(SIGN_UP_MUTATION);
  const navigate = useNavigate();
  const { saveUserCredentials } = useAuth();

  const loading = useDelayedLoading(signUpLoading);
  const { errors, catchError, cleanErrors } = useHandleAuthErrors();

  const handleOnSubmit = ({ email, password }: TOnSubmitValues) => {
    cleanErrors();

    signUp({
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
    <AuthForm
      onSubmit={handleOnSubmit}
      submitLoading={loading && !errors}
      submitText="Sign up"
      errors={errors}
    />
  );
}

export default SignUp;
