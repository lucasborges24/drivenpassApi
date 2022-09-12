import { cards } from "@prisma/client";
import { CreateUserToken } from "./authTypes";

export interface ICardLocals {
  body: ICardBody;
  token: CreateUserToken;
  id: number;
}

export type ICardBody = Omit<cards, "id" | "userId" | "createdAt">;
export type ICardInsert = Omit<cards, "id" | "createdAt">;
export type ICardLocalsGet = Omit<ICardLocals, "body">;
