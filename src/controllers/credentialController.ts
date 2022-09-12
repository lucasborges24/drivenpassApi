import { Request, Response } from "express";
import { credentialService } from "../services";
import {
  ICredentialLocals,
  ICredentialLocalsGet,
} from "../types/credentialType";

export const createCredential = async (req: Request, res: Response) => {
  const data: ICredentialLocals = {
    body: res.locals.body,
    token: res.locals.token,
    id: res.locals.userId,
  };
  const createdCredential = await credentialService.createCredential(data);

  res.status(201).send(createdCredential);
};

export const getAllCredentials = async (req: Request, res: Response) => {
  const { userId }: { userId: number } = res.locals.token;
  const credentials = await credentialService.getAllCredentials(userId);
  res.status(200).send(credentials);
};

export const getCredential = async (req: Request, res: Response) => {
  const data: ICredentialLocalsGet = {
    token: res.locals.token,
    id: res.locals.credentialId,
  };
  const credential = await credentialService.getCredentialById(data);

  res.status(200).send(credential);
};

export const deleteCredential = async (req: Request, res: Response) => {
  const data: ICredentialLocalsGet = {
    token: res.locals.token,
    id: res.locals.credentialId,
  };
  const deleted = await credentialService.deleteCredential(data);
  res.status(201).send(deleted);
};
