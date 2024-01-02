import { Avatar, Button, Card, CardBody, Flex, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Api from "../lib/axios"
import IProfilType from "../type/ProfilType"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store/store"

const Suggestion = () => {
  const [followStates, setFollowStates] = useState<boolean[]>([])
  const [allUsers, setAllUsers] = useState<IProfilType[]>([])
  const auth = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await Api.get("/user")

        if (response.status !== 200) {
          throw new Error("Failed to fetch users")
        }

        // Mendapatkan ID pengguna yang sedang login dari suatu sumber
        const currentUser = auth.loggedInUserId
          ? parseInt(auth.loggedInUserId, 10)
          : null

        // Filter data pengguna untuk menghilangkan pengguna yang sedang login
        const filteredUsers = response.data.data.filter((user: IProfilType) => {
          const isExcluded = user.id !== currentUser
          return isExcluded
        })

        setAllUsers(filteredUsers)
        setFollowStates(Array(filteredUsers.length).fill(false))
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchAllUsers()
  }, [])

  const handleButtonClick = async (index: number) => {
    try {
      if (followStates[index]) {
        // Unfollow user
        await Api.post("/unfollow", { followedUserId: allUsers[index].id })
      } else {
        // Follow user
        await Api.post("/follow", { followedUserId: allUsers[index].id })
      }

      const newFollowStates = [...followStates]
      newFollowStates[index] = !newFollowStates[index]
      setFollowStates(newFollowStates)
    } catch (error) {
      console.error("Error during follow/unfollow:", error)
    }
  }

  return (
    <Card overflow="auto" marginTop="15px" maxW="sm" height={"12rem"}>
      <CardBody>
        <h1>Suggestion For You</h1>
        {allUsers.map((user: IProfilType, index: number) => (
          <Flex key={user.id} marginTop="15px">
            <Flex>
              <Avatar
                size="sm"
                name={user.fullName}
                src={user.profil_picture}
              />
              <Stack fontSize="12px" marginLeft="5px">
                <h5>{user.fullName}</h5>
                <p className="-mt-2 font-light">@{user.userName}</p>
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
                    : "green.300",
                }}
              >
                {followStates[index] ? "Following" : "Follow"}
              </Button>
            </Stack>
          </Flex>
        ))}
      </CardBody>
    </Card>
  )
}

export default Suggestion
