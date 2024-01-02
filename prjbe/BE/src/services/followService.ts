// follow.service.ts
import { Repository } from "typeorm"
import { Follows } from "../entities/Follows"
import { User } from "../entities/User"
import { Request, Response } from "express"
import { AppDataSource } from "../data-source"

export default new (class FollowService {
  private readonly followsRepository: Repository<Follows> =
    AppDataSource.getRepository(Follows)
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User)

  async followUser(req: Request, res: Response): Promise<Response> {
    try {
      const { followedUserId } = req.body
      const followerUserId = res.locals.loginSession.user.id
      console.log(followedUserId)

      // Ensure that followerUser and followedUser are defined
      const followedUser = await this.userRepository.findOne(followedUserId)
      const followerUser = await this.userRepository.findOne(followerUserId)

      if (!followedUser || !followerUser) {
        return res.status(404).json({ message: "User not found" })
      }

      // Ensure that this.followsRepository is initialized
      if (!this.followsRepository) {
        return res
          .status(500)
          .json({ message: "Follows repository not initialized" })
      }

      // Check if the follow already exists
      const existingFollow = await this.followsRepository.findOne({
        where: { follower: followerUser, followed: followedUser },
      })

      if (existingFollow) {
        return res.status(400).json({ message: "Already following this user" })
      }

      // Create and save the new follow
      const newFollow = this.followsRepository.create({
        follower: followerUser,
        followed: followedUser,
      })

      await this.followsRepository.save(newFollow)

      return res.status(200).json({ message: "Successfully followed user" })
    } catch (error) {
      console.error("Error during followUser:", error.message)
      return res.status(500).json({ message: "Failed to follow user" })
    }
  }

  async unfollowUser(req: Request, res: Response): Promise<Response> {
    try {
      const { followedUserId } = req.body
      const followerUserId = res.locals.loginSession.user.id

      const followedUser = await this.userRepository.findOne(followedUserId)
      const followerUser = await this.userRepository.findOne(followerUserId)

      if (!followedUser || !followerUser) {
        return res.status(404).json({ message: "User not found" })
      }

      const existingFollow = await this.followsRepository.findOne({
        where: { follower: followerUser, followed: followedUser },
        relations: ["follower", "followed"],
      })

      if (!existingFollow) {
        return res.status(400).json({ message: "Not following this user" })
      }

      await this.followsRepository.remove(existingFollow)

      return res.status(200).json({ message: "Successfully unfollowed user" })
    } catch (error) {
      console.error("Error during unfollowUser:", error)
      return res.status(500).json({ message: "Failed to unfollow user" })
    }
  }

  async getFollowers(req: Request, res: Response): Promise<Response> {
    try {
      const userId = res.locals.loginSession.user.id
      const followers = await this.followsRepository.find({
        where: { followed: userId },
        relations: ["follower"],
      })

      return res.status(200).json({ message: "Success", data: followers })
    } catch (error) {
      console.error("Error during getFollowers:", error)
      return res.status(500).json({ message: "Failed to get followers" })
    }
  }

  async getFollowing(req: Request, res: Response): Promise<Response> {
    try {
      const userId = res.locals.loginSession.user.id
      const following = await this.followsRepository.find({
        where: { follower: userId },
        relations: ["followed"],
      })

      return res.status(200).json({ message: "Success", data: following })
    } catch (error) {
      console.error("Error during getFollowing:", error)
      return res.status(500).json({ message: "Failed to get following" })
    }
  }
})()
