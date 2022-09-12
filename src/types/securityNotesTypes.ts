import { securyNotes } from "@prisma/client";
import { CreateUserToken } from "./authTypes";

export interface ISecuryNotesLocals {
  body: SecuryNotesBody;
  token: CreateUserToken;
  id: number;
}

export type SecuryNotesInsert = Omit<securyNotes, "id" | "createdAt">;
export type SecuryNotesBody = Omit<securyNotes, "id" | "userId" | "createdAt">;
export type SecuryNotesLocalsGet = Omit<ISecuryNotesLocals, "body">;
