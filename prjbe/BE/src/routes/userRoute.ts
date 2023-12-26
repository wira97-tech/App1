import * as express from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
const UserRouter = express.Router();
UserRouter.get("/user", userController.findall);
UserRouter.post("/register", userController.Register);
UserRouter.post("/login", userController.login);
UserRouter.put("/user/:id/update", userController.update);
UserRouter.delete("/user/:id/delete", userController.delete);
UserRouter.get(
  "/user/check",
  authMiddleware.Authentication,
  userController.check
);
export default UserRouter;
