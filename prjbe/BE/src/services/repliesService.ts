import { Repository } from "typeorm"
import { Replies } from "../entities/Replies"
import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/User"
import { Thread } from "../entities/Thread"
import * as jwt from "jsonwebtoken"

export default new (class RepliesService {
  private readonly repliesRepository: Repository<Replies> =
    AppDataSource.getRepository(Replies)

  async createReply(req: Request, res: Response): Promise<Response> {
    try {
      const { content, threadId } = req.body
      const loginSession = res.locals.loginSession

      const reply = this.repliesRepository.create({
        content: content,
        thread: {
          id: threadId,
        },
        user: {
          id: loginSession.user.id,
        },
      })

      const savedReply = await this.repliesRepository.save(reply)

      return res.status(201).json({
        message: "Reply created successfully",
        data: savedReply,
      })
    } catch (error) {
      console.error("Error during reply creation:", error)
      return res.status(500).json({ message: "Failed to create reply" })
    }
  }

  async getRepliesForThread(req: Request, res: Response): Promise<Response> {
    try {
      const threadId: number = parseInt(req.params.threadId, 10)

      const replies = await this.repliesRepository.find({
        where: {
          thread: {
            id: threadId,
          },
        },
        relations: ["user"],
      })

      return res.status(200).json({
        message: "Success",
        data: replies,
      })
    } catch (error) {
      console.error("Error during retrieval of replies:", error)
      return res.status(500).json({ message: "Failed to retrieve replies" })
    }
  }
})()
