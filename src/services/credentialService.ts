import { checkParamsMatchs } from "../middlewares/idMiddleware";
import { credentialRepository } from "../repositories";
import { CreateUserToken } from "../types/authTypes";
import { ICredentialInsert, ICredentialLocals } from "../types/credentialType";
import Cryptr from "cryptr";
import dotenv from "dotenv";

const { CRYPTR_KEY } = process.env;
const cryptr = new Cryptr(CRYPTR_KEY!);

export const createCredential = async (data: ICredentialLocals) => {
  //   checar se id enviado bate com o do token;
  checkParamsMatchs(data.id, data.token.userId);
  // checar se o user já tem title cadastrado
  await checkTitleAlreadyWasUsed(data.token.userId, data.body.title);
  // encriptar senha
  const encryptedKey = await encryptParamByCryptr(data.body.password);
  // inserir dado no banco
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

export const encryptParamByCryptr = async (key: string) => {
  const encryptedKey = cryptr.encrypt(key);
  return encryptedKey;
};
