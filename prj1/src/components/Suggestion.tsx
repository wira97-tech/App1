import { Avatar, Button, Card, CardBody, Flex, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Api from "../lib/axios";
import IProfilType from "../type/ProfilType";

const Suggestion = () => {
  const [followStates, setFollowStates] = useState<boolean[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<IProfilType[]>([]);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await Api.get("/user");
        if (response.status !== 200) {
          throw new Error("Failed to fetch user data");
        }
        console.log("Actual response data:", response.data);
        // Check if the response data is an array before setting state
        if (Array.isArray(response.data.data)) {
          setSuggestedUsers(response.data.data); // Assuming the response is an array of user objects
        } else {
          console.error("Invalid user data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchSuggestedUsers();
  }, []);

  const handleButtonClick = (index: number) => {
    const newFollowStates = [...followStates];
    newFollowStates[index] = !newFollowStates[index];
    setFollowStates(newFollowStates);
  };
  return (
    <Card marginTop="15px" maxW="sm">
      <CardBody>
        <h1>Suggested For You</h1>
        {suggestedUsers.map((user: IProfilType, index: number) => (
          <Flex key={user.id} marginTop="15px">
            <Flex>
              <Avatar
                size="sm"
                name={user.fullName}
                src={user.profil_picture}
              />
              <Stack fontSize="12px" marginLeft="5px">
                <h5>{user.fullName}</h5>
                <p className="-mt-2">@{user.userName}</p>
              </Stack>
            </Flex>
            <Stack className="left-72 absolute">
              <Button
                borderRadius="5rem"
                size="sm"
                border="2px solid white"
                fontSize="12px"
                onClick={() => handleButtonClick(index)}
                colorScheme={followStates[index] ? "gray" : "gray"}
                _hover={{
                  backgroundColor: followStates[index]
                    ? "gray.500"
                    : "gray.700",
                }}
              >
                {followStates[index] ? "Following" : "Follow"}
              </Button>
            </Stack>
          </Flex>
        ))}
      </CardBody>
    </Card>
  );
};
export default Suggestion;
