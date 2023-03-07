import {
  IPokemon,
  POKEMON_FIELDS,
  POKEMON_TYPES,
} from "../models/pokemonModel";
import * as express from "express";
import { dbClient } from "../app";
export const getAllPokemons = async () => {
  return dbClient.db("pokemons").collection("pokemons").find().toArray();
};

export const getAllPokemonTypes = async () => {
  try {
    let pokemonTypes: string[] = [];
    const pokemons: IPokemon[] = await dbClient
      .db("pokemons")
      .collection<IPokemon>("pokemons")
      .find()
      .toArray();
    pokemons.forEach((pokemon: IPokemon) => {
      for (const [key, value] of Object.entries(pokemon)) {
        if (key === POKEMON_FIELDS.type) {
          value.forEach((type: string) => {
            if (!pokemonTypes.includes(type)) {
              pokemonTypes.push(type);
            }
          });
        }
      }
    });
    return pokemonTypes;
  } catch (e) {
    console.error(e);
  }
};

export const getPokemonsByType = async (req: express.Request) => {
  const typeQuerry =
    req.params.type.charAt(0).toUpperCase() + req.params.type.slice(1);
  if (Object.values(POKEMON_TYPES).includes(typeQuerry as POKEMON_TYPES)) {
    const foundPokemons = await dbClient
      .db("pokemons")
      .collection<IPokemon>("pokemons")
      .find({ type: `${typeQuerry}` })
      .toArray();
    return foundPokemons;
  } else {
    throw new Error("type you specified does not exist");
  }
};
