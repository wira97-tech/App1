import * as express from "express";
import userController from "../controllers/userController";

const UserRouter = express.Router();
UserRouter.get("/user", userController.findall);
UserRouter.post("/register", userController.Register);
UserRouter.post("/login", userController.login);

export default UserRouter;
