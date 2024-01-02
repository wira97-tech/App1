import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { FiUpload } from "react-icons/fi"
import Api from "../lib/axios"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store/store"

interface FormData {
  fullName: string
  userName: string
  profil_description: string
  profil_picture: File | null
}
const EditProfil = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const token = localStorage.getItem("token") + ""
  const auth = useSelector((state: RootState) => state.auth)

  const [imagePreview, setImagePreview] = useState("")
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    userName: "",
    profil_description: "",
    profil_picture: null,
  })
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setFormData({
        ...formData,
        profil_picture: file,
      })
      const url = URL.createObjectURL(file)
      setImagePreview(url)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const response = await Api.patch(
        `/user/${auth.loggedInUserId}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response.data)
    } catch (error) {
      console.error("Error updating profile", error)
    }
  }
  return (
    <>
      <Button z-index={10} onClick={onOpen} borderRadius={"full"}>
        Edit Profil
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Change Your Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>User Name</FormLabel>
              <Input
                placeholder="Change Your User Name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Profil Description</FormLabel>
              <Input
                placeholder="Change Your Profil Description"
                name="profil_description"
                value={formData.profil_description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Profile Picture</FormLabel>
              <Input
                type="file"
                display="none"
                id="image-upload"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <IconButton
                  as="span"
                  icon={<FiUpload />}
                  aria-label="Upload Image"
                />
              </label>
              {imagePreview && (
                <Image src={imagePreview} alt="Uploaded Image" mt="4" />
              )}
            </FormControl>
          </ModalBody>
          <form onClick={handleSubmit} encType="multipart/form-data">
            <ModalFooter>
              <Button colorScheme="green" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
export default EditProfil
