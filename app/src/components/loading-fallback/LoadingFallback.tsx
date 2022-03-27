import { Box } from "@chakra-ui/react";

function LoadingFallback() {
  return (
    <Box
      marginBlockStart="4"
      borderWidth="2px"
      borderStyle="solid"
      borderColor="black"
      p="2"
    >
      Loading...
    </Box>
  );
}

export default LoadingFallback;
