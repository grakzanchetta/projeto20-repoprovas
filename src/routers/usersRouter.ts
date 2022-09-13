import { Router } from "express";
import {
  helloThere,
  createUser,
  loginUser,
} from "../controllers/usersController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { createNewUser, authUser } from "../schemas/usersSchema";

const usersRouter = Router();

usersRouter.get("/hello", helloThere);
usersRouter.post(
  "/signup",
  validateSchemaMiddleware(createNewUser),
  createUser
);
usersRouter.post("/signin", validateSchemaMiddleware(authUser), loginUser);

export default usersRouter;
