import { Request, Response } from "express";
import threadService from "../services/threadService";

export default new (class ThreadController {
  findall(req: Request, res: Response) {
    threadService.findall(req, res);
  }
  create(req: Request, res: Response) {
    threadService.create(req, res);
  }
  findById(req: Request, res: Response) {
    threadService.findById(req, res);
  }
})();
