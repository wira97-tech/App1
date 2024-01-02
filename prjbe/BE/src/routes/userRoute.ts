import * as express from "express"
import userController from "../controllers/userController"
import authMiddleware from "../middlewares/authMiddleware"
import userService from "../services/userService"
import uploadFileMiddleware from "../middlewares/uploadFileMiddleware"
const UserRouter = express.Router()

UserRouter.get("/user", userController.findall)
UserRouter.post("/register", userController.Register)
UserRouter.post("/login", userController.login)
UserRouter.get("/user/suggested", async (req, res) => {
  try {
    const loggedInUserId = req.query.loggedInUserId as string

    // Periksa apakah loggedInUserId adalah string yang valid sebelum digunakan
    if (!loggedInUserId) {
      return res.status(400).json({ message: "Invalid loggedInUserId" })
    }

    const userIdAsNumber = parseInt(loggedInUserId, 10)

    // Periksa apakah userIdAsNumber adalah bilangan bulat yang valid sebelum digunakan
    if (isNaN(userIdAsNumber)) {
      return res.status(400).json({ message: "Invalid loggedInUserId" })
    }

    const suggestedUsers = await userService.findSuggestedUsers(loggedInUserId)

    res.status(200).json({ message: "Success", data: suggestedUsers })
  } catch (error) {
    console.error("Error fetching suggested users:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

UserRouter.patch(
  "/user/:id/update",
  authMiddleware.Authentication,
  uploadFileMiddleware.Upload("image"),
  userController.update
)
UserRouter.delete(
  "/user/:id/delete",
  authMiddleware.Authentication,
  userController.delete
)
UserRouter.get(
  "/user/check",
  authMiddleware.Authentication,
  userController.check
)
export default UserRouter
