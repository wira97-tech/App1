import { Repository } from "typeorm";
import { Thread } from "../entities/Thread";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { createThreadSchema } from "../utils/validator/threadValidator";
import { v2 } from "cloudinary";
import * as fs from "fs";
import { object } from "joi";

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
      const dataResponse = await this.threadRepository.find({
        relations: { user: true },
        order: {
          id: "DESC",
        },
      });
      return res.status(200).json({ message: "Success", data: dataResponse });
    } catch (err) {
      return res.status(500).json({ message: "Error" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      console.log("mega", req.body);
      const loginSession = res.locals.loginSession;
      const image = res.locals.filename;
      console.log("ini", res.locals.loginSession);
      const objectData = await this.threadRepository.create({
        content: req.body.content,
        user: loginSession.user.id,
        image: image || null,
      });

      console.log("ini objek", objectData);
      const { error, value } = createThreadSchema.validate(data);
      if (error) return res.status(400).json({ error: error });

      if (error || image === undefined) {
        // Handle the case where the image file is not provided
        return res.status(400).json({ error: "Image file is required" });
      }

      console.log("Image filename:", image);
      const imagePath = "src/uploads/" + image;
      console.log("Full image path:", imagePath);

      // Check if the image file exists before uploading
      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: "Image file not found" });
      }
      v2.config({
        cloud_name: "dem7wdexn",
        api_key: "865441742318562",
        api_secret: "lEDmBisXMNivpjfCyN3tFNOjEGY",
      });

      const cloudinaryResponse = await v2.uploader.upload(imagePath);
      const cloudinaryImageUrl = cloudinaryResponse.secure_url;

      // create object biar typenya sesuai
      const thread = this.threadRepository.create({
        content: req.body.content,
        image: cloudinaryImageUrl,
        user: loginSession.user.id,
      });
      console.log("ini adalah", thread);

      const insertData = await this.threadRepository.save(thread);
      return res.status(200).json({
        message: "success create thread",
        insertData: insertData,
      });
    } catch (error) {
      console.error("Error during thread creation:", error);
      return res.status(404).json({ message: "Failed to create thread" });
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
