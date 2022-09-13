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
      message: "category or teacher/discipline not found",
    };
  }

  await assignmentsRepository.insertAssignment(assignmentData);
  return assignmentData;
}

export { createAssignment };
