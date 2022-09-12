import { Request, Response } from "express";
import { securityNoteService } from "../services";
import { ISecuryNotesLocals } from "../types/securityNotesTypes";

export const postSecurityNote = async (req: Request, res: Response) => {
  const data: ISecuryNotesLocals = {
    body: res.locals.body,
    token: res.locals.token,
    id: res.locals.userId,
  };
  const securityNote = await securityNoteService.insertSecurityNote(data);
  res.status(201).send(securityNote);
};
