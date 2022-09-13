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

async function getAssignmentsByDiscipline() {
  const result = await prisma.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          teachersdisciplines: {
            include: {
              teacher: {
                select: {
                  name: true,
                },
              },
              teste: {
                include: {
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
}

async function getAssignmentByInstructors() {
  const result = await prisma.teachers.findMany({
    select: {
      id: true,
      name: true,
      teachersdisciplines: {
        include: {
          discipline: true,
          teste: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  return result;
}

async function insertAssignment(data: Tests) {
  await prisma.tests.create({
    data,
  });
}

export {
  insertAssignment,
  findCategoryById,
  findTeacherDisciplineById,
  getAssignmentsByDiscipline,
  getAssignmentByInstructors,
};
