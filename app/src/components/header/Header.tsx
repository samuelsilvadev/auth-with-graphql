import { useAuth } from "state/auth/AuthContext";

function Header() {
  const { isAuthenticated } = useAuth();

  return <header>{isAuthenticated ? "Welcome" : "Header"}</header>;
}

export default Header;
