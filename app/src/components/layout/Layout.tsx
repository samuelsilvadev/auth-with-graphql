import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@chakra-ui/react";
import Header from "components/header/Header";

function Layout() {
  return (
    <Container p="4" maxW="container.lg">
      <Header />
      <Suspense fallback="loading...">
        <Box
          marginBlockStart="4"
          borderWidth="2px"
          borderStyle="solid"
          borderColor="black"
          p="2"
        >
          <Outlet />
        </Box>
      </Suspense>
    </Container>
  );
}

export default Layout;
