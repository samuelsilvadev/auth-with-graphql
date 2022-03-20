import { gql, useMutation } from "@apollo/client";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../state/auth/AuthContext";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    signIn({
      variables: {
        email,
        password,
      },
    }).then(() => {
      saveUserCredentials(email, password);
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button disabled={loading}>Sign in</button>
    </form>
  );
}

export default SignIn;
