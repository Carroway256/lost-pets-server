import type { WithId, Document } from "mongodb";
export interface IUser {
    username:string;
    password:string;
    _id?:number
  }