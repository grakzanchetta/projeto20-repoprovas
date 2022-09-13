import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware";
import { createNewAssignment } from "../schemas/assignmentsSchema";
import { validateSchemaMiddleware } from "../middlewares/schemaMiddleware";
import {
  createAssignment,
  findAllAssignmentsByTeacher,
  findAllAssignmentsByDiscipline,
} from "../controllers/assignmentsController";

const assignmentsRouter = Router();

assignmentsRouter.post(
  "/create",
  validateToken,
  validateSchemaMiddleware(createNewAssignment),
  createAssignment
);

assignmentsRouter.get(
  "/discipline",
  validateToken,
  findAllAssignmentsByDiscipline
);
assignmentsRouter.get("/teacher", validateToken, findAllAssignmentsByTeacher);

export default assignmentsRouter;
