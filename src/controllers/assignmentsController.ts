import { Request, Response } from "express";
import * as assignmentServices from "../services/assignmentsServices";

async function createAssignment(req: Request, res: Response) {
  const assignmentData = req.body;

  const createdAssignment = await assignmentServices.createAssignment(
    assignmentData
  );
  res.status(201).send(createdAssignment);
}

async function findAllAssignmentsByDiscipline(req: Request, res: Response) {
  const assignmentsList =
    await assignmentServices.findAllAssignmentsByDiscipline();
  res.status(200).send(assignmentsList);
}

async function findAllAssignmentsByTeacher(req: Request, res: Response) {
  const assignmentsList =
    await assignmentServices.findAllAssignmentsByTeacher();
  res.status(200).send(assignmentsList);
}

export {
  createAssignment,
  findAllAssignmentsByDiscipline,
  findAllAssignmentsByTeacher,
};
