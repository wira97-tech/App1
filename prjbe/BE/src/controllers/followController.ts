import { Request, Response } from "express";
import followService from "../services/followService";

class FollowController {
  followUser = async (req: Request, res: Response) => {
    await followService.followUser(req, res);
  };

  unfollowUser = async (req: Request, res: Response) => {
    await followService.unfollowUser(req, res);
  };

  getFollowers = async (req: Request, res: Response) => {
    await followService.getFollowers(req, res);
  };

  getFollowing = async (req: Request, res: Response) => {
    await followService.getFollowing(req, res);
  };
}

export default new FollowController();
