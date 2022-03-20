import { Box, Flex, Link } from "@chakra-ui/react";
import LogoutButton from "components/logout-button/LogoutButton";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "state/auth/AuthContext";

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <Box
      as="header"
      height="100px"
      borderWidth="2px"
      borderStyle="solid"
      borderColor="black"
      p="2"
    >
      <Box as="nav" h="100%">
        <Flex
          as="ul"
          alignItems="center"
          justifyContent="flex-start"
          gap="4"
          listStyleType="none"
          h="100%"
        >
          <Box as="li" flexGrow="1">
            <Link to="/" as={RouterLink}>
              Home
            </Link>
          </Box>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/sign-in" as={RouterLink}>
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/sign-up" as={RouterLink}>
                  Sign up
                </Link>
              </li>
            </>
          ) : (
            <li>
              <LogoutButton />
            </li>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default Header;
