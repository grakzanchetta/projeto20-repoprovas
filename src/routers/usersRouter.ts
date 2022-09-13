import { Router } from "express";
import { helloThere, createUser } from "../controllers/usersController";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { createNewUser } from "../schemas/usersSchema";

const usersRouter = Router();

usersRouter.get("/hello", helloThere);
usersRouter.post(
  "/signup",
  validateSchemaMiddleware(createNewUser),
  createUser
);

export default usersRouter;
