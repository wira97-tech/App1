import * as express from "express";
import threadController from "../controllers/threadController";

const ThreadRouter = express.Router();
ThreadRouter.get("/thread", threadController.findall);
ThreadRouter.post("/thread", threadController.create);
ThreadRouter.get("/thread/:id", threadController.findById);

export default ThreadRouter;
