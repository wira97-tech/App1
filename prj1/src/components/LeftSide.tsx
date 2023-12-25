import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faHeart,
  faUser,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { RiLogoutBoxLine } from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleImageClick = () => {
    // Membuka dialog pemilihan gambar saat ikon diklik
    inputRef.current?.click();
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
  };

  const imagePreviewStyle: React.CSSProperties = {
    backgroundImage: `url(${imagePreview})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  useEffect(() => {});
  const navigate = useNavigate();
  return (
    <div className="container mx-auto mt-3 ms-4 top-0 me-4 fixed">
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bgSize="lg">
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl className="flex">
              <Avatar
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                marginRight="10px"
              />
              <Input
                ref={initialRef}
                variant="flushed"
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
              <button>
                <LuImagePlus
                  className="text-green-500 mr-2"
                  onClick={handleImageClick}
                  size="37px"
                />
              </button>
            </label>
            <Button colorScheme="green" mr={3}>
              Reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack direction="row" align="center">
        <p
          className="text-green-500 font-bold me-6"
          style={{ fontSize: "50px" }}
        >
          circle
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
      <ul className="mt-4">
        <li className="mt-4">
          <FontAwesomeIcon icon={faHouse} className="me-2" />
          <button className="hover:text-green-500 active:text-green-500 font-bold">
            Home
          </button>
        </li>
        <li className="mt-4">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" />
          <button className="hover:text-green-500 font-bold">Search</button>
        </li>
        <li className="mt-4">
          <FontAwesomeIcon icon={faHeart} className="me-2" />
          <button className="hover:text-green-500 font-bold">Follow</button>
        </li>
        <li className="mt-4">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          <button className="hover:text-green-500 font-bold">Profile</button>
        </li>
      </ul>
      <button
        onClick={onOpen}
        className="mt-4 bg-green-500 hover:bg-green-900 rounded-lg p-2 text-white w-52 font-semibold items"
      >
        Create Post
      </button>
      <div>
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          marginTop="22rem"
        >
          <RiLogoutBoxLine />
          <span>Log Out</span>
        </Button>
      </div>
    </div>
  );
};
export default Navigation;
