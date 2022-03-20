import { gql, useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { useAuth } from "state/auth/AuthContext";
import { useGetLoggedInUser } from "state/auth/useGetLoggedInUser";

const LOGOUT_MUTATION = gql`
  mutation Logout($email: String!) {
    signOut(email: $email) {
      email
    }
  }
`;

function LogoutButton() {
  const { email, password, removeUserCredentials } = useAuth();
  const [logout, { loading }] = useMutation(LOGOUT_MUTATION);
  const { refetch } = useGetLoggedInUser({ email, password });

  const handleOnLogout = () => {
    logout({
      variables: {
        email,
      },
    }).then(() => {
      removeUserCredentials();
      refetch();
    });
  };

  return (
    <Button isLoading={loading} onClick={handleOnLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
