import * as express from "express";
import repliesController from "../controllers/repliesController";
import authMiddleware from "../middlewares/authMiddleware";

const RepliesRouter = express.Router();

RepliesRouter.post(
  "/replies",
  authMiddleware.Authentication,
  repliesController.createReply
);

RepliesRouter.get(
  "/replies/:threadId",
  authMiddleware.Authentication,
  repliesController.getRepliesForThread
);

export default RepliesRouter;
