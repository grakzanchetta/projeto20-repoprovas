import { Router } from "express";
import { helloThere } from "../controllers/usersController";

const usersRouter = Router();

usersRouter.get("/hello", helloThere);

export default usersRouter;
