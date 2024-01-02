import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import RepliesPage from "./pages/RepliesPage"
import { PrivateRoute } from "./privateRoute/privateRoute"
import FollowPage from "./pages/FollowPage"
import ProfilePage from "./pages/ProfilePage"
import SearchPage from "./pages/SearchPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}></Route>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/thread/:id" element={<RepliesPage />}></Route>
        <Route path="/follow" element={<FollowPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
      </Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  )
}

export default App
