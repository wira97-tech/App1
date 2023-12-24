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
})();
