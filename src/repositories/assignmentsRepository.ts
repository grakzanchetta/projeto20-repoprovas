import prisma from "../databases/database";
import { Tests } from "../types/types";

async function findCategoryById(id: number) {
  return await prisma.categories.findFirst({
    where: {
      id,
    },
  });
}

async function findTeacherDisciplineById(id: number) {
  return await prisma.teachersDisciplines.findFirst({
    where: {
      id,
    },
  });
}

async function insertAssignment(data: Tests) {
  await prisma.tests.create({
    data,
  });
}

export { insertAssignment, findCategoryById, findTeacherDisciplineById };
