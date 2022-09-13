import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware";
import { createNewAssignment } from "../schemas/assignmentsSchema";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import { createAssignment } from "../controllers/assignmentsController";

const assignmentsRouter = Router();

assignmentsRouter.post(
  "/create",
  validateToken,
  validateSchemaMiddleware(createNewAssignment),
  createAssignment
);

export default assignmentsRouter;
