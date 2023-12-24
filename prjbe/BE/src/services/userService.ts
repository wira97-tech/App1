import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { log } from "console";

export default new (class UserService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async findall(req: Request, res: Response): Promise<Response> {
    try {
      const dataResponse = await this.userRepository.find();
      return res.status(200).json({ message: "Success", data: dataResponse });
    } catch (err) {
      return res.status(500).json({ message: "Error" });
    }
  }

  async Register(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const responseData: number = await this.userRepository.count({
        where: { userName: data.userName },
      });
      if (responseData === 2) {
        return res.status(404).json({ message: "username is already exist" });
      }
      const bcryptPassword = await bcrypt.hash(data.password, 10);
      const User = this.userRepository.create({
        userName: data.userName,
        fullName: data.fullName,
        email: data.email,
        password: bcryptPassword,
        profil_picture: data.profil_picture,
        profil_description: data.profil_description,
      });
      const insertData = await this.userRepository.save(User);
      return res.status(200).json({
        message: "success insert data",
        insertData: insertData,
      });
    } catch (error) {
      console.error("error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const responseData = await this.userRepository.findOne({
        where: { userName: data.userName },
      });
      if (responseData === undefined) {
        return res.status(404).json({ message: "username is wrong" });
      }
      const checkPassword = await bcrypt.compare(
        data.password,
        responseData.password
      );
      if (checkPassword === false) {
        return res.status(404).json({ message: "password is wrong" });
      }
      const user = await this.userRepository.create({
        id: responseData.id,
        userName: responseData.userName,
      });

      return res.status(200).json({ message: "succesfully login" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "something went wrong" });
    }
  }
})();
