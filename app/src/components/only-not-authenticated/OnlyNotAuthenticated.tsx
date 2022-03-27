import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "state/auth/AuthContext";
import LoadingFallback from "components/loading-fallback/LoadingFallback";

type TOnlyNotAuthenticatedProps = {
  fallback?: ReactElement | null;
  element: ReactElement;
};

function OnlyNotAuthenticated({
  element,
  fallback = <LoadingFallback withoutStyles />,
}: TOnlyNotAuthenticatedProps) {
  const { isAuthenticated, isAuthenticationLoading } = useAuth();

  if (isAuthenticationLoading) {
    return fallback;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
}

export default OnlyNotAuthenticated;
