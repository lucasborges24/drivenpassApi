import { CreateUserToken } from "./authTypes";
import { Credentials } from "@prisma/client";

export interface ICredentialLocals {
  body: ICredentialBody;
  token: CreateUserToken;
  id: number;
}

export type ICredentialBody = Omit<Credentials, "id" | "userId" | "createdAt">;
export type ICredentialInsert = Omit<Credentials, "id" | "createdAt">;
export type ICredentialLocalsGet = Omit<ICredentialLocals, "body">;
