import { gql, useMutation } from "@apollo/client";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION);
  const { saveUserCredentials } = useAuth();
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <VStack spacing="12px" align="start">
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            borderRadius="0"
            borderColor="black"
            borderWidth="2px"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            borderRadius="0"
            borderColor="black"
            borderWidth="2px"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </FormControl>
        <Button type="submit" disabled={loading}>
          Sign in
        </Button>
      </VStack>
    </form>
  );
}

export default SignIn;
