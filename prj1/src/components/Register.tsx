import { Container, Flex, FormControl, Input } from "@chakra-ui/react";

const Register = () => {
  return (
    <Flex height="100vh" align="center">
      <Container maxW="md" className="container justify-center">
        <h1>
          <p className="text-green-500 font-bold" style={{ fontSize: "50px" }}>
            circle
          </p>
        </h1>
        <h2 style={{ fontSize: "30px" }}>Create account Circle</h2>
        <FormControl isRequired className="mt-3">
          <Input placeholder="Full Name" className="mt-3" />
          <Input placeholder="Email" className="mt-3" />
          <Input placeholder="Password" className="mt-3" />
          <button className="mt-4 bg-green-700 hover:bg-green-900 rounded-full p-2 text-white w-full font-semibold items">
            Create
          </button>
        </FormControl>
        <p className="mt-3">
          Already have an account?{" "}
          <span className="text-green-500 font-bold hover:text-green-300">
            Login
          </span>
        </p>
      </Container>
    </Flex>
  );
};
export default Register;
