import { gql, useQuery } from "@apollo/client";

export const GET_USER_QUERY = gql`
  query GetLoggedUser($email: String!, $password: String!) {
    loggedInUser(email: $email, password: $password) {
      email
    }
  }
`;

type TGetUserQueryResponse = {
  loggedInUser: { email: string } | null;
};

export const useGetLoggedInUser = ({
  email,
  password,
}: {
  email: string | null;
  password: string | null;
}) => {
  return useQuery<TGetUserQueryResponse>(GET_USER_QUERY, {
    skip: !email || !password,
    variables: {
      email,
      password,
    },
  });
};
