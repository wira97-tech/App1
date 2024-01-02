import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  useColorMode,
} from "@chakra-ui/react"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import Api from "../lib/axios"
import IThreadType from "../type/ThreadType"
import moment from "moment"

const Profile = () => {
  const token = localStorage.getItem("token") + ""
  const user = jwtDecode<{ user: any }>(token)
  const { colorMode } = useColorMode()
  const [threadsByUserId, setThreadsByUserId] = useState<IThreadType[]>([])

  const getThreadsByUsersId = async () => {
    try {
      const response = await Api.get(`/thread/user/${user.user.id}`)
      const data = response.data.data
      setThreadsByUserId(data)
    } catch (error) {
      console.error("Gagal mengambil data:", error)
    }
  }
  console.log("Ini data", threadsByUserId)

  useEffect(() => {
    getThreadsByUsersId()
  }, [])
  return (
    <>
      <Card maxW="full" maxH="md" className="rounded-md p-3  end-0">
        <CardBody>
          <h1 className="mb-4 font-bold" style={{ fontSize: "20px" }}>
            Profile
          </h1>
          <Image
            src="/images/bg1.jpg"
            alt="background colour"
            borderRadius="lg"
            width={"100%"}
            height="10rem"
          />
          <Avatar
            width={"30%"}
            height={"30%"}
            src={user.user.profil_picture}
            border={`5px solid ${colorMode === "dark" ? "#2D3748" : "white"}`}
            className="relative bottom-20 left-16"
          />
          <div className="bottom-52 relative -mt-5 left-80">
            <h2 style={{ fontSize: 30 }}>🎆✨{user.user.fullName}✨🎆</h2>
            <h6
              style={{ fontSize: 17, color: "#a3a8a5", marginBottom: "10px" }}
            >
              @{user.user.userName}
            </h6>
            <p style={{ fontSize: 20 }}>{user.user.profil_description}</p>
            <div className="flex items-center">
              <p className="me-2">23{user.followingCount}</p>
              <p className="me-2 font-light" style={{ fontSize: "sm" }}>
                Following
              </p>
              <p className="me-2 ">32{user.followersCount}</p>
              <p className="font-light">Followers</p>
            </div>
          </div>
        </CardBody>
      </Card>
      <Box>
        <Card className="mt-10 mb-10">
          <h1
            style={{
              textAlign: "center",
              fontSize: "26px",
            }}
          >
            🎊Your Threads🎊
          </h1>
        </Card>
        {threadsByUserId?.map((thread) => (
          <Card marginBottom={5} padding={9}>
            <Flex alignItems={"center"} marginTop={5}>
              <Avatar src="/images/bg1.jpg" />
              <Flex direction={"column"} marginStart={"10px"}>
                <p style={{ fontSize: "15px" }}>{user.user.fullName}</p>
                <p className="font-light">@{user.user.userName}</p>
              </Flex>
            </Flex>
            <div style={{ marginLeft: "56px", marginTop: "10px" }}>
              <p style={{ fontSize: "15px" }}>{thread.content}</p>
              {thread.image && (
                <img
                  src={thread.image}
                  style={{ borderRadius: "10px", width: "30rem" }}
                />
              )}
              <p
                className=" text-gray-400"
                style={{ fontSize: "13px", marginTop: "15px" }}
              >
                {moment(thread.postedAt).format(" HH:mm . MMMM DD, YYYY ")}
              </p>
            </div>
          </Card>
        ))}
      </Box>
    </>
  )
}
export default Profile
