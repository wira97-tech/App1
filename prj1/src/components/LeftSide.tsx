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
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { RiLogoutBoxLine } from "react-icons/ri";
import React from "react";
const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <div className="container mx-auto mt-3 ms-4 top-0 me-4 fixed">
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Textarea ref={initialRef} placeholder="First name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
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
      <button onClick={onOpen} className="mt-4 bg-green-500 hover:bg-green-900 rounded-lg p-2 text-white w-52 font-semibold items">
        Create Post
      </button>
      <Link href="/login">
        <Flex className="items-center mt-96" style={{ fontSize: "18px" }}>
          <RiLogoutBoxLine />
          <span>Log Out</span>
        </Flex>
      </Link>
    </div>
  );
};
export default Navigation;
