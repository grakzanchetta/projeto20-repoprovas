import prisma from "../databases/database";
import { CreateAndLoginUser } from "../types/types";

async function findUserByEmail(email: string) {
  return await prisma.users.findFirst({
    where: {
      email,
    },
  });
}

async function findAllUsers() {
  return await prisma.users.findMany();
}

async function insertUser(data: CreateAndLoginUser) {
  await prisma.users.create({
    data,
  });
}

export { findUserByEmail, insertUser, findAllUsers };
