import type { WithId, Document } from "mongodb";

export interface IPokemon extends WithId<Document> {
  name: INameLaguagues;
  type: POKEMON_TYPES[];
  base: IBaseStats;
}
interface INameLaguagues {
  english: string;
  japanese: string;
  chinese: string;
  french: string;
}
interface IBaseStats {
  HP: number;
  Attack: number;
  Defense: number;
  Speed: number;
}
export enum POKEMON_FIELDS {
  name = "name",
  type = "type",
  base = "base",
}
export enum POKEMON_TYPES {
  grass="Grass",
  poison="Poison",
  water="Water",
  fire="Fire",
  flying="Flying",
}
