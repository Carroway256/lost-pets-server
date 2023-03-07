import * as express from "express";
import * as bcrypt from "bcrypt";
import { dbClient } from "../app";
import { IUser } from "../models/userModel";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../env";

export const createUser = async (req: express.Request) => {
  const body: IUser = req.body;
  const users = await dbClient
    .db("pokemons")
    .collection<IUser>("users")
    .find()
    .toArray();
  if (Object.keys(body).length === 0) {
    throw new Error("you must provide body");
  } else if (checkIfUserExists(users, body)) {
    throw new Error("user already exists");
  } else {
    const hashedPassword = await hashPassword(body.password);
    const newUser: IUser = {
      ...body,
      password: hashedPassword || body.password,
    };
    const result = await dbClient
      .db("pokemons")
      .collection<IUser>("users")
      .insertOne(newUser);
    return result;
  }
};

export const loginUser = async (req: express.Request) => {
  const user = await dbClient
    .db("pokemons")
    .collection<IUser>("users")
    .findOne({ username: req.body.username });
  if (user === null) {
    throw new Error("user doesn't exist");
  } else {
    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = await authUser(req.body.username);
        return token;
      } else {
        throw new Error("wrong password");
      }
    } catch (err) {
      console.log(err);
    }
  }
};
const checkIfUserExists = (users: IUser[], body: IUser) => {
  let counter = 0;
  users.forEach((user: IUser) => {
    if (user.username === body.username) {
      counter++;
    }
  });
  return counter > 0 ? true : false;
};

const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
};
const authUser = (username: string) => {
  return jwt.sign(username, ACCESS_TOKEN_SECRET);
};

export const authenticateToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token === null || !token) return res.sendStatus(401);
  else {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      next();
    });
  }
};
