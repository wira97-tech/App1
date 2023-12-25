import { Container, Flex, FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../lib/axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store/store";
import { register } from "../redux/slices/authSlice";
import Swal from "sweetalert2";


const Register: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  
  const handleRegister = async () => {
    dispatch(register({ fullName, userName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
    // try {
    //   const response = await Api.post("/register", {
    //     fullName,
    //     userName,
    //     email,
    //     password,
    //   });
    //   const data = response.data;
    //   console.log("ini data", data);
    //   console.log("Kode setelah menerima respons");
    //   navigate("/login");
    // } catch (error) {
    //   console.error("Error during Registration", error);
    // }
    // console.log(setFullName);
  };
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
          <Input
            className="mt-3"
            placeholder="Fullname"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            className="mt-3"
            placeholder="Username"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="Email"
            className="mt-3"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            className="mt-3"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleRegister}
            className="mt-4 bg-green-700 hover:bg-green-900 rounded-full p-2 text-white w-full font-semibold items"
          >
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
