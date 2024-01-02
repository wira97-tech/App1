import UserProfile from "./UserProfile";
import Suggestion from "./Suggestion";
import Author from "./Author";
import { Box, Card } from "@chakra-ui/react";

export default function RightSide() {
  return (
    <div className="container mx-auto border-l mt-2 ms-4 fixed top-0">
      <>
        <UserProfile />
        <Box overflowY="auto" className="relative mt-4">
          <Suggestion />
        </Box>
        <Author />
      </>
    </div>
  );
}
