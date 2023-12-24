import { Card, CardBody, Flex } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Author = () => {
  return (
    <Card marginTop="15px" maxW="sm">
      <CardBody>
        <Flex alignItems="center" className="gap-3">
          <p>
            Developed By <span className="font-extrabold">Putu Wiranto </span>
          </p>
          <FaGithub />
          <FaLinkedin />
          <FaFacebook />
          <FaInstagram />
        </Flex>
        <p className="flex items-center" style={{ fontSize: "10px" }}>
          Powered By{" "}
          <img
            src="/images/logo.png"
            style={{ width: "19px", height: "16px" }}
            className="ms-2 me-2"
          />
          Dumbways Indonesia #1 Coding Bootcamp
        </p>
      </CardBody>
    </Card>
  );
};
export default Author;
