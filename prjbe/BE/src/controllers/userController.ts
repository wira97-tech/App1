import { Request, Response } from "express";
import userService from "../services/userService";

export default new (class UserController {
  findall(req: Request, res: Response) {
    userService.findall(req, res);
  }
  Register(req: Request, res: Response) {
    userService.Register(req, res);
  }
  login(req: Request, res: Response) {
    userService.login(req, res);
  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      await userService.update(req, res);
    } catch (error) {
      console.error("error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await userService.delete(req, res);
    } catch (error) {
      console.error("error", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  check(req: Request, res: Response) {
    userService.check(req, res)
  }
})();
