import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "state/auth/AuthContext";
import LoadingFallback from "components/loading-fallback/LoadingFallback";

type TOnlyAuthenticatedProps = {
  fallback?: ReactElement | null;
  element: ReactElement;
};

function OnlyAuthenticated({
  element,
  fallback = <LoadingFallback />,
}: TOnlyAuthenticatedProps) {
  const { isAuthenticated, isAuthenticationLoading } = useAuth();

  if (isAuthenticationLoading) {
    return fallback;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return element;
}

export default OnlyAuthenticated;
