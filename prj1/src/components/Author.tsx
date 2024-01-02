import { Card, CardBody, Flex, Link } from "@chakra-ui/react"
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa"

const Author = () => {
  return (
    <Card marginTop="24px" maxW="sm">
      <CardBody>
        <Flex alignItems="center" className="gap-3">
          <p>
            Developed By <span className="font-extrabold">Putu Wiranto </span>
          </p>
          <a
            href="https://github.com/wira97-tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/putu-wiranto-p-9a2492131"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://shorturl.at/dhzOZ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
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
  )
}
export default Author
