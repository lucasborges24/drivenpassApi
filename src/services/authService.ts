import { CreateUserData } from "../types/authTypes";
import bcrypt from "bcrypt";
import { authRepository } from "../repositories";

const SALT = 10;

export const signUp = async (data: CreateUserData) => {
  const { email, password } = data;
  await checkEmailIsAlreadyRegistered(email);
  const encryptedPassword = encryptPasswordBcrypt(password);
  const userWithEncryptedPassword: CreateUserData = {
    email,
    password: encryptedPassword,
  };
  const newUser = await insertUserService(userWithEncryptedPassword);
  return newUser;
};

export const encryptPasswordBcrypt = (password: string) => {
  try {
    const hash = bcrypt.hashSync(password, SALT);
    return hash;
  } catch (error) {
    throw error;
  }
};

export const insertUserService = async (data: CreateUserData) => {
  const insertedUser = await authRepository.insertUser(data);
  return insertedUser;
};

export const getUserByEmail = async (email: string) => {
  const user = await authRepository.getUserByEmail(email);
  return user;
};

export const checkEmailIsAlreadyRegistered = async (email: string) => {
  const user = await getUserByEmail(email);
  if (user) {
    const error: object = {
      type: "Conflit",
      message: "Email já cadastrado.",
    };
    throw error;
  }
  return false;
};
