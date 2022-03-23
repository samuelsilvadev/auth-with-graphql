import { gql, useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
      navigate("/");
    });
  };

  return (
    <Button isLoading={loading} onClick={handleOnLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
