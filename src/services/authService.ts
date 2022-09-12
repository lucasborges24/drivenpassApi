import { CreateUserData, CreateUserToken } from "../types/authTypes";
import { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { authRepository } from "../repositories";

dotenv.config();

const SALT = 10;
const EXPIRE_TIME_SECONDS = 30 * 24 * 60 * 60;
const jwtExpire = {
  expiresIn: EXPIRE_TIME_SECONDS,
};

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

export const signIn = async (data: CreateUserData) => {
  const { email, password } = data;
  const user: Users = await getEmailThatExists(email);
  // checar se senha do user bate com a enviada
  checkPasswordsMatch(password, user.password);
  // criar token com id e email do user
  const tokenInfo = {
    userId: user.id,
    email: user.email,
  };
  const token = createTokenByJwt(tokenInfo);
  // enviar token
  return token;
};

export const encryptPasswordBcrypt = (password: string) => {
  try {
    const hash = bcrypt.hashSync(password, SALT);
    return hash;
  } catch (error) {
    throw error;
  }
};

export const checkPasswordsMatch = (
  password: string,
  encryptedPassword: string
) => {
  const passwordIsValid = bcrypt.compareSync(password, encryptedPassword);
  if (!passwordIsValid) {
    const error: object = {
      type: "Unauthorized",
      message: "Dados incorretos.",
    };
    throw error;
  }
  return true;
};

export const createTokenByJwt = (data: CreateUserToken) => {
  try {
    const { JWT_SECRETKEY } = process.env;
    const token = jwt.sign(data, JWT_SECRETKEY!, jwtExpire);
    return token;
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

export const getEmailThatExists = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    const error: object = {
      type: "Unauthorized",
      message: "Dados incorretos.",
    };
    throw error;
  }
  return user;
};
