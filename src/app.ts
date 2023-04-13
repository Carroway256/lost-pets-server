import * as express from "express";
import pokemonRouter from "./routes/pokemonRoutes";
import { MongoClient } from "mongodb";

import authRouter from "./routes/authRoutes";
import { MONGO_URL } from "./env";

export const app = express();
const port = 4000;

export const dbClient = new MongoClient(
  MONGO_URL);

app.use(express.json());
app.use("/pokemons", pokemonRouter);
app.use("/auth", authRouter);
app.get("/", async (req: express.Request, res: express.Response) => {
  try {
    await dbClient.connect();
    res.sendStatus(202).send();
  } catch (e) {
    res.sendStatus(501).send(e);
  } 
});

app.listen(port, () => {
  return console.log(`Expreass is listening at http://localhost:${port}`);
});

