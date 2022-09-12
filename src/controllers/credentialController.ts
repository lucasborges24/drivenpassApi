import { Request, Response } from "express";
import { credentialService } from "../services";
import { ICredentialLocals } from "../types/credentialType";

export const createCredential = async (req: Request, res: Response) => {
  const data: ICredentialLocals = {
    body: res.locals.body,
    token: res.locals.token,
    id: res.locals.userId,
  };
  const createdCredential = await credentialService.createCredential(data);

  res.status(201).send(createdCredential);
};
