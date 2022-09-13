import { Router } from "express";
import { helloThere } from "../controllers/usersController";

const userRouter = Router();

userRouter.get("/hello", helloThere);
