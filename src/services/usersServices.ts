import * as usersRepository from "../repositories/usersRepository";
import { encryptMasterPassword } from "../utils/encryptServices";
import { CreateAndLoginUser } from "../types/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
  return userData;
}

async function loginUser(userData: CreateAndLoginUser) {
  await validateLogin(userData);
  const token = await generateToken(userData);
  return token;
}

async function validateLogin(userData: CreateAndLoginUser) {
  const { email, password } = userData;
  const userExists = await usersRepository.findUserByEmail(email);

  if (!userExists) {
    throw {
      type: "not_found",
      message: "email not found",
    };
  }
  const isCorrectPassword = await bcrypt.compare(password, userExists.password);
  if (isCorrectPassword === false) {
    throw {
      type: "unauthorized",
      message: "wrong password",
    };
  }
}

async function generateToken(userData: CreateAndLoginUser) {
  const userExists = await usersRepository.findUserByEmail(userData.email);
  const userId = userExists?.id;

  const token = jwt.sign({ userId }, String(process.env.JWT_KEY));
  return token;
}

export { createUser, loginUser };
