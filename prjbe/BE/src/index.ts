import * as express from "express";
import * as cors from "cors";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import ThreadRouter from "./routes/threadRoute";
import UserRouter from "./routes/userRoute";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    const corsOption = {
      origin: "*",
      method: "GET, HEAD, PUT, PATCH, POST, DELETE",
      preflightContinue: false,
      optionSuccessStatus: 204,
    };
    app.use(express.json());
    app.use(cors(corsOption));
    app.use("/api/v1", ThreadRouter);
    app.use("/api/v1", UserRouter);

    app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Heeheheh" });
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
