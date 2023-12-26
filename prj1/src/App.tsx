import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RepliesPage from "./pages/RepliesPage";
import { PrivateRoute } from "./privateRoute/privateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
      <Route index element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/thread/:id" element={<RepliesPage />}></Route>
      </Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  );
}

export default App;
