import { Request, Response } from "express"
import repliesService from "../services/repliesService"

export default new (class RepliesController {
  async createReply(req: Request, res: Response) {
    await repliesService.createReply(req, res)
  }

  async getRepliesForThread(req: Request, res: Response) {
    await repliesService.getRepliesForThread(req, res)
  }
})()
