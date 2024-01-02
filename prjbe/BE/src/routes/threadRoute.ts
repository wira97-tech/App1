import * as express from "express"
import threadController from "../controllers/threadController"
import authMiddleware from "../middlewares/authMiddleware"
import uploadFileMiddleware from "../middlewares/uploadFileMiddleware"

const ThreadRouter = express.Router()

ThreadRouter.post(
  "/thread",
  authMiddleware.Authentication,
  uploadFileMiddleware.Upload("image"),
  threadController.create
)
ThreadRouter.get("/thread", threadController.findall)
ThreadRouter.get("/thread/:id", threadController.findById)
ThreadRouter.get("/thread/user/:userId", threadController.findThreadsByUserId)

export default ThreadRouter
