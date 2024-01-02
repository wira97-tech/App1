import * as express from "express";
import followController from "../controllers/followController";
import authMiddleware from "../middlewares/authMiddleware";

const FollowRouter = express.Router();

FollowRouter.post(
  "/follow",
  authMiddleware.Authentication,
  followController.followUser
);

FollowRouter.post(
  "/unfollow",
  authMiddleware.Authentication,
  followController.unfollowUser
);

FollowRouter.get(
  "/followers",
  authMiddleware.Authentication,
  followController.getFollowers
);

FollowRouter.get(
  "/following",
  authMiddleware.Authentication,
  followController.getFollowing
);

export default FollowRouter;
