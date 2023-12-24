import { Avatar, Button, Card, CardBody, Flex, Stack } from "@chakra-ui/react";
import { useState } from "react";

const Suggestion = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleButtonClick = () => {
    setIsFollowing((prevIsFollowing) => !prevIsFollowing);
  };
  return (
    <Card marginTop="15px" maxW="sm">
      <CardBody>
        <h1>Suggested For You</h1>
        <Flex marginTop="15px">
          <Flex>
            <Avatar
              size="sm"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            />{" "}
            <Stack fontSize="12px" marginLeft="5px">
              <h5>Tajul Subqi</h5>
              <p className="-mt-2">@tajul</p>
            </Stack>
          </Flex>
          <Stack className="left-72 absolute">
            <Button
              borderRadius="5rem"
              size="sm"
              border="2px solid white"
              fontSize="12px"
              onClick={handleButtonClick}
              colorScheme={isFollowing ? "gray" : "gray"}
              _hover={{
                backgroundColor: isFollowing ? "gray.500" : "gray.700",
              }}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
          </Stack>
        </Flex>
        <Flex marginTop="10px">
          <Flex>
            <Avatar
              size="sm"
              name="Kent Dodds"
              src="https://bit.ly/kent-c-dodds"
            />{" "}
            <Stack fontSize="12px" marginLeft="5px">
              <h5>Tajul Subqi</h5>
              <p className="-mt-2">@tajul</p>
            </Stack>
          </Flex>
          <Stack className="left-72 absolute">
            <Button
              borderRadius="5rem"
              size="sm"
              border="2px solid white"
              fontSize="12px"
            >
              Follow
            </Button>
          </Stack>
        </Flex>
      </CardBody>
    </Card>
  );
};
export default Suggestion;
