import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react"
import { TbUserSearch } from "react-icons/tb"
import Api from "../lib/axios"
import { useEffect, useState } from "react"
import IProfilType from "../type/ProfilType"
import { RootState } from "../redux/store/store"
import { useSelector } from "react-redux"

const Search = () => {
  const [followStates, setFollowStates] = useState<boolean[]>([])
  const [allUsers, setAllUsers] = useState<IProfilType[]>([])
  const [filteredUsers, setFilteredUsers] = useState<IProfilType[]>([])
  const [searchInput, setSearchInput] = useState("")
  const auth = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await Api.get("/user")

        if (response.status !== 200) {
          throw new Error("Failed to fetch users")
        }
        const currentUser = auth.loggedInUserId
          ? parseInt(auth.loggedInUserId, 10)
          : null

        // Filter data pengguna untuk menghilangkan pengguna yang sedang login
        const filteredUsers = response.data.data.filter((user: IProfilType) => {
          const isExcluded = user.id !== currentUser
          console.log(`User ${user.id} - Excluded: ${isExcluded}`)
          return isExcluded
        })

        setAllUsers(filteredUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchAllUsers()
  }, [])

  useEffect(() => {
    const filtered = allUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.userName.toLowerCase().includes(searchInput.toLowerCase())
    )
    setFilteredUsers(filtered)
  }, [allUsers, searchInput])

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
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <TbUserSearch />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search Account"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </InputGroup>
      {filteredUsers.map((user: IProfilType, index: number) => (
        <Flex
          key={user.id}
          marginTop="30px"
          justifyContent={"space-between"}
          paddingRight={"25px"}
          paddingLeft={"25px"}
          alignItems={"center"}
        >
          <Flex>
            <Avatar size="md" name={user.fullName} src={user.profil_picture} />
            <Stack fontSize="14px" marginLeft="5px">
              <h5>{user.fullName}</h5>
              <p className="-mt-2 font-light">@{user.userName}</p>
            </Stack>
          </Flex>
          <Stack className="">
            <Button
              borderRadius="5rem"
              size="sm"
              border="2px solid white"
              fontSize="14px"
              onClick={() => handleButtonClick(index)}
              colorScheme={followStates[index] ? "gray" : "gray"}
              _hover={{
                backgroundColor: followStates[index] ? "gray.500" : "green.300",
              }}
            >
              {followStates[index] ? "Following" : "Follow"}
            </Button>
          </Stack>
        </Flex>
      ))}
    </Box>
  )
}
export default Search
