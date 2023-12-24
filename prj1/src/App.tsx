import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Login from "./components/Login";
import Replies from "./components/Replies";
import RepliesPage from "./pages/RepliesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/thread/:id" element={<RepliesPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>

    </Routes>
  );
}

export default App;
