import { Request, Response } from "express";
import * as userServices from "../services/usersServices";

async function helloThere(req: Request, res: Response) {
  const result = await userServices.getAllUsers();
  res.status(201).send(result);
}

async function createUser(req: Request, res: Response) {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  const createdUser = await userServices.createUser(userData);
  res.status(201).send(createdUser);
}

async function loginUser(req: Request, res: Response) {
  const user = req.body;
  const loginUser = await userServices.loginUser(user);

  res.status(201).send(loginUser);
}

export { createUser, loginUser, helloThere };
