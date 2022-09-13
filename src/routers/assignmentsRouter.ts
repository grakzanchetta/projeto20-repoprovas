import { Router } from "express";

import { helloThere } from "../controllers/usersController";
import { validateToken } from "../middlewares/authMiddleware";

import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";

const assignmentsRouter = Router();

assignmentsRouter.get("/hellotest", validateToken, helloThere);

export default assignmentsRouter;
