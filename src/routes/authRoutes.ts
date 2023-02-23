import * as express from "express";
import { createUser, loginUser } from "../dbOperations/authOperations";

const authRouter = express.Router();

authRouter
  .route("/register")
  .post(async (req: express.Request, res: express.Response) => {
    try {
      const result = await createUser(req);
      res.status(200).send({ message: result });
    } catch (err) {
      console.log(err);
      res.status(401).send({ message: err.message });
    }
  });
authRouter
  .route("/login")
  .post(async (req: express.Request, res: express.Response) => {
    try {
      const result = await loginUser(req);
      res.status(200).send({ message: result });
    } catch (err) {
      console.log(err);
      res.status(401).send({ message: err.message });
    }
  });

export default authRouter;
