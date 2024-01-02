import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHouse,
  faMagnifyingGlass,
  faHeart,
  faUser,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons"
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Textarea,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react"
import { RiLogoutBoxLine } from "react-icons/ri"
import React, { FormEvent, useEffect, useRef, useState } from "react"
import { LuImagePlus } from "react-icons/lu"
import { useLocation, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import Api from "../lib/axios"
import { useDispatch } from "react-redux"
import { logout } from "../redux/slices/authSlice"
import { AppDispatch } from "../redux/store/store"
import Swal from "sweetalert2"
const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [inputValue, setInputValue] = useState("")
  const [Image, setNewImage] = useState<File>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const token = localStorage.getItem("token") + ""
  const user = jwtDecode<{ user: any }>(token)

  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleImageClick = () => {
    // Membuka dialog pemilihan gambar saat ikon diklik
    inputRef.current?.click()
  }

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(selectedImage)
    }
  }

  const clearImagePreview = () => {
    setImagePreview(null)
  }

  const imagePreviewStyle: React.CSSProperties = {
    backgroundImage: `url(${imagePreview})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }
  const location = useLocation()
  useEffect(() => {})

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value)
  }
  console.log("input value:", inputValue)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("image", Image!)
    formData.append("content", inputValue)
    const response = await Api.post("/thread", formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log(response)
    setInputValue("")
    setNewImage(undefined)
    clearImagePreview()
  }
  console.log(Image)
  console.log(inputValue)

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          showConfirmButton: false,
          timer: 1500,
        })
        navigate("/login")
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        })
      )
  }
  return (
    <div className="container mx-auto mt-3 ms-4 top-0 me-4 fixed">
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <form onSubmit={handleSubmit}>
          <ModalOverlay />
          <ModalContent bgSize="lg">
            <ModalCloseButton />
            <ModalBody pb={6} marginTop={10}>
              <FormControl className="flex">
                <Avatar
                  name={user.user.fullName}
                  src={user.user.profil_picture}
                  marginRight="10px"
                />
                <Textarea
                  onChange={handleInputChange}
                  width="40rem"
                  ref={initialRef}
                  // variant="flushed"
                  placeholder="What's happening"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack className="me-60">
                {imagePreview && (
                  <div
                    className="w-20 h-20 overflow-hidden ml-16"
                    style={imagePreviewStyle}
                  >
                    <button
                      className="w-full h-full flex items-center justify-center bg-black bg-opacity-50"
                      onClick={clearImagePreview}
                      type="button"
                    >
                      X
                    </button>
                  </div>
                )}
              </Stack>
              <label className="relative cursor-pointer items-center ">
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <button type="button">
                  <LuImagePlus
                    className="text-green-500 mr-2"
                    onClick={handleImageClick}
                    size="37px"
                  />
                </button>
              </label>
              <Button type="submit" colorScheme="green" mr={3}>
                Reply
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <Stack direction="row" align="center">
        <p
          className="text-green-500 font-bold me-6"
          style={{ fontSize: "50px" }}
        >
          Circle
        </p>
        <Button
          bg="transparent"
          onClick={toggleColorMode}
          size="lg"
          className="-mt-0"
        >
          {colorMode === "light" ? (
            <>
              <FontAwesomeIcon icon={faMoon} className="text-gray-400" />
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSun} className="text-gray-400" />
            </>
          )}
        </Button>
      </Stack>
      <Box width={"fit-content"}>
        <ul className="mt-4 ms-7" style={{ fontSize: "17px" }}>
          <NavLink
            to="/home"
            style={{
              color:
                location.pathname === "/home"
                  ? "green"
                  : colorMode === "light"
                  ? "black"
                  : "white",
            }}
          >
            <li className="mt-9">
              <FontAwesomeIcon icon={faHouse} className="me-2" />
              <button className="hover:text-green-500 active:text-green-500 font-bold">
                Home
              </button>
            </li>
          </NavLink>
          <NavLink
            to="/search"
            style={{
              color:
                location.pathname === "/search"
                  ? "green"
                  : colorMode === "light"
                  ? "black"
                  : "white",
            }}
          >
            <li className="mt-7">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
              <button className="hover:text-green-500 font-bold">Search</button>
            </li>
          </NavLink>
          <NavLink
            to="/follow"
            style={{
              color:
                location.pathname === "/follow"
                  ? "green"
                  : colorMode === "light"
                  ? "black"
                  : "white",
            }}
          >
            <li className="mt-7">
              <FontAwesomeIcon icon={faHeart} className="me-2" />
              <button className="hover:text-green-500 font-bold">Follow</button>
            </li>
          </NavLink>
          <NavLink
            to="/profile"
            style={{
              color:
                location.pathname === "/profile"
                  ? "green"
                  : colorMode === "light"
                  ? "black"
                  : "white",
            }}
          >
            <li className="mt-7">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              <button className="hover:text-green-500 font-bold">
                Profile
              </button>
            </li>
          </NavLink>
        </ul>
      </Box>
      <button
        onClick={onOpen}
        className="mt-7 bg-green-500 hover:bg-green-900 rounded-lg p-2 text-white w-52 font-semibold items"
      >
        Create Post
      </button>
      <div>
        <Button
          onClick={() => {
            handleLogout()
          }}
          marginTop="18rem"
        >
          <RiLogoutBoxLine />
          <span>Log Out</span>
        </Button>
      </div>
    </div>
  )
}
export default Navigation
