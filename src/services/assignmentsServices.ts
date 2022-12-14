import * as assignmentsRepository from "../repositories/assignmentsRepository";
import { Tests } from "../types/types";

async function createAssignment(assignmentData: Tests) {
  const categoryExists = await assignmentsRepository.findCategoryById(
    assignmentData.categoryId
  );
  const teacherDisciplineExists =
    await assignmentsRepository.findTeacherDisciplineById(
      assignmentData.teacherDisciplineId
    );

  if (!categoryExists || !teacherDisciplineExists) {
    throw {
      type: "not_found",
      message: "category or teacher/discipline doesn't exist!",
    };
  }

  await assignmentsRepository.insertAssignment(assignmentData);
  return assignmentData;
}

async function findAllAssignmentsByDiscipline() {
  const assignmentsData =
    await assignmentsRepository.getAssignmentsByDiscipline();

  return assignmentsData;
}

async function findAllAssignmentsByTeacher() {
  const assignmentsData =
    await assignmentsRepository.getAssignmentByInstructors();

  return assignmentsData;
}

export {
  createAssignment,
  findAllAssignmentsByDiscipline,
  findAllAssignmentsByTeacher,
};
