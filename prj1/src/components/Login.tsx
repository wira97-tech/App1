import { Container, Flex, FormControl, Input } from "@chakra-ui/react";

const Login = () => {
  return (
    <Flex height="100vh" align="center">
      <Container maxW="md" className="container justify-center">
        <h1>
          <p className="text-green-500 font-bold" style={{ fontSize: "50px" }}>
            circle
          </p>
        </h1>
        <h2 style={{ fontSize: "30px" }}>Login to Circle</h2>
        <FormControl isRequired className="mt-3">
          <Input placeholder="Email/Username" className="mt-3" />
          <Input placeholder="Password" className="mt-3" />
          <p className="text-green-600 hover:text-green-500 justify-end flex mt-2">
            Forgot Password?
          </p>
          <button className="mt-2 bg-green-700 hover:bg-green-900 rounded-full p-2 text-white w-full font-semibold items">
            Login
          </button>
        </FormControl>
        <p className="mt-3">
          Don't have an account yet?{" "}
          <span className="text-green-500 font-bold hover:text-green-300">
            Register
          </span>
        </p>
      </Container>
    </Flex>
  );
};
export default Login;
