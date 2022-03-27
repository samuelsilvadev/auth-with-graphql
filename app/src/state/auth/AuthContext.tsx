import { createContext, useContext, useState } from "react";
import { useGetLoggedInUser } from "./useGetLoggedInUser";

type TAuthContext = {
  email: string | null;
  password: string | null;
  isAuthenticated: boolean;
  isAuthenticationLoading: boolean;
  saveUserCredentials: (email: string, password: string) => void;
  removeUserCredentials: () => void;
};
type TAuthProviderProps = { children: React.ReactNode };
type TUserCredentials = { email: string | null; password: string | null };

const AuthContext = createContext<TAuthContext>({
  email: null,
  password: null,
  isAuthenticated: false,
  isAuthenticationLoading: true,
  saveUserCredentials: () => void 0,
  removeUserCredentials: () => void 0,
});

function getUserFromStorage(): {
  email: string | null;
  password: string | null;
} | null {
  try {
    const user = window.sessionStorage.getItem("AWG_USER");

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

    window.sessionStorage.setItem(
      "AWG_USER",
      JSON.stringify({ email, password })
    );
  };

  const removeUserCredentials = () => {
    window.sessionStorage.removeItem("AWG_USER");
  };

  return (
    <AuthContext.Provider
      value={{
        email: userCredentials?.email ?? null,
        password: userCredentials?.password ?? null,
        isAuthenticated: !loading && !!data?.loggedInUser,
        isAuthenticationLoading: loading,
        saveUserCredentials,
        removeUserCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
