import { gql, useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { useAuth } from "state/auth/AuthContext";

const LOGOUT_MUTATION = gql`
  mutation Logout($email: String!) {
    signOut(email: $email) {
      email
    }
  }
`;

function LogoutButton() {
  const { email } = useAuth();
  const [logout, { loading }] = useMutation(LOGOUT_MUTATION);

  const handleOnLogout = () => {
    logout({
      variables: {
        email,
      },
    });
  };

  return (
    <Button isLoading={loading} onClick={handleOnLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
