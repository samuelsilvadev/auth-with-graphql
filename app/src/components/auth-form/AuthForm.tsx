import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";

export type TOnSubmitValues = {
  email: string;
  password: string;
};

type TAuthFormProps = {
  submitLoading: boolean;
  submitText: string;
  onSubmit: (values: TOnSubmitValues) => void;
};

function AuthForm({ submitText, submitLoading, onSubmit }: TAuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmit({ email, password });
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
        <Button type="submit" isLoading={submitLoading}>
          {submitText}
        </Button>
      </VStack>
    </form>
  );
}

export default AuthForm;
