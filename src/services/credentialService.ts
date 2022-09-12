import { checkParamsMatchs } from "../middlewares/idMiddleware";
import { credentialRepository } from "../repositories";
import { CreateUserToken } from "../types/authTypes";
import {
  ICredentialInsert,
  ICredentialLocals,
  ICredentialLocalsGet,
} from "../types/credentialType";
import Cryptr from "cryptr";
import dotenv from "dotenv";
import { Credentials } from "@prisma/client";

const { CRYPTR_KEY } = process.env;
const cryptr = new Cryptr(CRYPTR_KEY!);

export const createCredential = async (data: ICredentialLocals) => {
  checkParamsMatchs(data.id, data.token.userId);
  await checkTitleAlreadyWasUsed(data.token.userId, data.body.title);
  const encryptedKey = await encryptParamByCryptr(data.body.password);
  const objectToInsert: ICredentialInsert = {
    url: data.body.url,
    username: data.body.username,
    password: encryptedKey,
    title: data.body.title,
    userId: data.token.userId,
  };
  const credential = await credentialRepository.insertCredential(
    objectToInsert
  );
  return credential;
};

export const getAllCredentials = async (id: number) => {
  const credentials = await credentialRepository.getCredentialsById(id);
  const uncryptCredentials = uncryptParams(credentials);
  return uncryptCredentials;
};

export const getCredentialById = async (data: ICredentialLocalsGet) => {
  const credential = await searchCredentialById(data.id);
  checkParamsMatchs(credential.userId, data.token.userId);
  const uncryptCredential = uncryptObject(credential);
  return uncryptCredential;
};

export const checkTitleAlreadyWasUsed = async (id: number, title: string) => {
  const credential = await credentialRepository.getCredentialByIdAndTitle(
    id,
    title
  );
  if (credential) {
    const error: object = {
      type: "Conflit",
      message: "Já existe credencial com este título.",
    };
    throw error;
  }
  return;
};

export const searchCredentialById = async (id: number) => {
  const credential = await credentialRepository.getCredentialById(id);
  if (!credential) {
    const error: object = {
      type: "Not_Found",
      message: "Credencial Não existe.",
    };
    throw error;
  }
  return credential;
};

export const encryptParamByCryptr = async (key: string) => {
  const encryptedKey = cryptr.encrypt(key);
  return encryptedKey;
};

export const uncryptParams = (keys: Credentials[]) => {
  try {
    const uncryptArray = keys.map((item) => {
      const newObject = {
        ...item,
        password: cryptr.decrypt(item["password"]),
      };
      return newObject;
    });
    return uncryptArray;
  } catch (error) {
    throw error;
  }
};

export const uncryptObject = (object: Credentials) => {
  try {
    const uncrypt = {
      ...object,
      password: cryptr.decrypt(object["password"]),
    };
    return uncrypt;
  } catch (error) {
    throw error;
  }
};
