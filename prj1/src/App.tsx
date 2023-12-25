import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RepliesPage from "./pages/RepliesPage";
import { PrivateRoute } from "./privateRoute/privateRoute";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/thread/:id" element={<RepliesPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
