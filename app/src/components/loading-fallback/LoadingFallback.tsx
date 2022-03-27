import { Box } from "@chakra-ui/react";

type TLoadingFallbackProps = {
  withoutStyles?: boolean;
};

function LoadingFallback({ withoutStyles = false }: TLoadingFallbackProps) {
  return (
    <Box
      {...(!withoutStyles && {
        marginBlockStart: "4",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "black",
        p: "2",
      })}
    >
      Loading...
    </Box>
  );
}

export default LoadingFallback;
