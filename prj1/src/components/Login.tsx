import { Container, Flex, FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import { AppDispatch } from "../redux/store/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = async () => {
    dispatch(login({ email, password }))
      .unwrap()
      .then((data: any) => {
        console.log("login success");
        const token = data.token;
        console.log("Token:", token);
        localStorage.setItem("token", token);
        navigate("/home");
        console.log("login success");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };
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
          <Input
            placeholder="Email/Username"
            className="mt-3"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            className="mt-3"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-green-600 hover:text-green-500 justify-end flex mt-2">
            Forgot Password?
          </p>
          <button
            onClick={handleLogin}
            className="mt-2 bg-green-700 hover:bg-green-900 rounded-full p-2 text-white w-full font-semibold items"
          >
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
