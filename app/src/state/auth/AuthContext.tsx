import { createContext, useContext, useState } from "react";
import { useGetLoggedInUser } from "./useGetLoggedInUser";

type TAuthContext = {
  email: string | null;
  isAuthenticated: boolean;
  saveUserCredentials: (email: string, password: string) => void;
};
type TAuthProviderProps = { children: React.ReactNode };
type TUserCredentials = { email: string | null; password: string | null };

const AuthContext = createContext<TAuthContext>({
  email: null,
  isAuthenticated: false,
  saveUserCredentials: () => void 0,
});

function getUserFromStorage(): {
  email: string | null;
  password: string | null;
} | null {
  try {
    const user = window.localStorage.getItem("AWG_USER");

    if (user) {
      return JSON.parse(user);
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}

export const AuthProvider = ({ children }: TAuthProviderProps) => {
  const [userCredentials, setUserCredentials] =
    useState<TUserCredentials | null>(getUserFromStorage());

  const { data, loading } = useGetLoggedInUser({
    email: userCredentials?.email ?? null,
    password: userCredentials?.password ?? null,
  });

  const saveUserCredentials = (email: string, password: string) => {
    setUserCredentials({ email, password });

    window.localStorage.setItem(
      "AWG_USER",
      JSON.stringify({ email, password })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        email: userCredentials?.email ?? null,
        isAuthenticated: !loading && !!data?.loggedInUser,
        saveUserCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
