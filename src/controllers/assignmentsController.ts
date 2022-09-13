import { Request, Response } from "express";
import * as assignmentServices from "../services/assignmentsServices";

async function createAssignment(req: Request, res: Response) {
  const assignmentData = req.body;

  const createdAssignment = await assignmentServices.createAssignment(
    assignmentData
  );
  res.status(201).send(createdAssignment);
}

export { createAssignment };
