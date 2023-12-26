import { Repository } from "typeorm";
import { Thread } from "../entities/Thread";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export default new (class ThreadService {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);
  // private userRepository: Repository <User> = AppDataSource.getRepository(User)

  // async createThread(content: string, userId: number): Promise<Thread> {
  //   const user = await this.userRepository.findOne(userId);

  //   if (!user) {
  //     throw new Error("User not found");
  //   }

  //   const thread = new Thread();
  //   thread.content = content;
  //   thread.user = user;

  //   return await this.threadRepository.save(thread);
  // }
  async findall(req: Request, res: Response): Promise<Response> {
    try {
      const dataResponse = await this.threadRepository.find();
      return res.status(200).json({ message: "Success", data: dataResponse });
    } catch (err) {
      return res.status(500).json({ message: "Error" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const loginSession = res.locals.loginSession;
      const image = res.locals.filename;
      const objectData = await this.threadRepository.create({
        content: data.content,
        image: image,
        user: {
          id: loginSession.userId,
        },
      });
      const insertData = await this.threadRepository.save(objectData);
      return res.status(200).json({
        message: "success insert data",
        insertData: insertData,
      });
    } catch (error) {
      console.error("error", error);
      return res.status(404).json({ message: "Failed to insert data" });
    }
  }
  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const threadDetails = await this.threadRepository.findOneBy({ id });
      console.log(threadDetails);
      if (threadDetails) {
        return res
          .status(200)
          .json({ message: "Success", data: threadDetails });
      } else {
        return res.status(404).json({ message: "Thread not found" });
      }
    } catch (error) {
      console.error("error", error);
      return res.status(500).json({ message: "Error" });
    }
  }
})();
