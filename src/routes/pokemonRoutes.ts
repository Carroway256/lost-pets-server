import * as express from "express";
import { authenticateToken } from "../dbOperations/authOperations";
import {
  getAllPokemons,
  getAllPokemonTypes,
  getPokemonsByType,
} from "../dbOperations/pokemonOperations";

const pokemonRouter = express.Router();

pokemonRouter
  .route("/")
  .get(async (req: express.Request, res: express.Response) => {
    const pokemons = await getAllPokemons();
    res.send(pokemons);
  });

pokemonRouter
  .route("/types", )
  .get(authenticateToken,async (req: express.Request, res: express.Response) => {
    const pokemonTypes = await getAllPokemonTypes();
    res.send(pokemonTypes);
  });

pokemonRouter
  .route("/:type")
  .get(async (req: express.Request, res: express.Response) => {
    try {
      const result = await getPokemonsByType(req);
      res.send(result);
    } catch (err) {
      console.log(err.message);
      res.status(401).send({ message: err.message });
    }
  });

export default pokemonRouter;
