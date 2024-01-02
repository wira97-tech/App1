import {
  Avatar,
  Card,
  CardBody,
  Image,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react"
import { jwtDecode } from "jwt-decode"
import EditProfil from "./EditProfil"
import { useState } from "react"

const UserProfile = () => {
  const token = localStorage.getItem("token") + ""
  const user = jwtDecode<{ user: any }>(token)
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isEditing, setIsEditing] = useState(false)
  const handleEditProfile = () => {
    onOpen()
    setIsEditing(true)
  }
  return (
    <Card maxW="sm" maxH="sm" className="rounded-md">
      <CardBody>
        <h1 className="mb-4 font-bold">My Profile</h1>
        <Image
          src="/images/bg1.jpg"
          alt="background colour"
          borderRadius="lg"
        />
        <Avatar
          size="xl"
          src={user.user.profil_picture}
          border={`5px solid ${colorMode === "dark" ? "#2D3748" : "white"}`}
          className="relative bottom-12 left-10"
        />
        <div className="flex justify-center items-center">
          <button
            onClick={handleEditProfile}
            className="mt-2 bottom-24 relative ml-auto rounded-full font-normal mr-2"
          >
            <div style={{ zIndex: 20 }}>
              <EditProfil />
            </div>
          </button>
        </div>
        <div className="bottom-11 relative -mt-8 ">
          <h2 style={{ fontSize: 20 }}>🎆✨{user.user.fullName}✨🎆</h2>
          <h6 style={{ fontSize: 13, color: "#a3a8a5" }}>
            @{user.user.userName}
          </h6>
          <p>{user.user.profil_description}</p>
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
      {isEditing && <EditProfil isOpen={isOpen} onClose={onClose} />}
    </Card>
  )
}
export default UserProfile
