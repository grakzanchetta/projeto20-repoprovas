import * as usersRepository from "../repositories/usersRepository";
import { encryptMasterPassword } from "../utils/encryptServices";
import { CreateAndLoginUser } from "../types/types";

async function getAllUsers() {
  const result = await usersRepository.findAllUsers();
  return result;
}

async function createUser(userData: CreateAndLoginUser) {
  await validateSignUp(userData);
  userData.password = encryptMasterPassword(userData.password);
  await usersRepository.insertUser(userData);
  return userData;
}

async function validateSignUp(userData: CreateAndLoginUser) {
  const userExists = await usersRepository.findUserByEmail(userData.email);
  if (userExists) {
    throw {
      type: "conflict",
      message: "email already registered. try another",
    };
  }
  if (userData.password.length < 10) {
    throw {
      type: "unauthorized",
      message: "password must be 10 characters long, at least",
    };
  }
  return userData;
}

export { createUser, getAllUsers };
