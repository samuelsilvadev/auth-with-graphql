import { gql, useMutation } from "@apollo/client";
import AuthForm, { TOnSubmitValues } from "components/auth-form/AuthForm";
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

function SignIn() {
  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION);
  const { saveUserCredentials } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = ({ email, password }: TOnSubmitValues) => {
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
    }).then(() => {
      saveUserCredentials(email, password);
      navigate("/");
    });
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      submitLoading={loading}
      submitText="Sign in"
    />
  );
}

export default SignIn;
