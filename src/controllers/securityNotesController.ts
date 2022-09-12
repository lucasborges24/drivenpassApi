import { Request, Response } from "express";
import { securityNoteService } from "../services";
import {
  ISecuryNotesLocals,
  SecuryNotesLocalsGet,
} from "../types/securityNotesTypes";

export const postSecurityNote = async (req: Request, res: Response) => {
  const data: ISecuryNotesLocals = {
    body: res.locals.body,
    token: res.locals.token,
    id: res.locals.userId,
  };
  const securityNote = await securityNoteService.insertSecurityNote(data);
  res.status(201).send(securityNote);
};

export const getAllSecuryNotes = async (req: Request, res: Response) => {
  const { userId }: { userId: number } = res.locals.token;
  const securyNotes = await securityNoteService.getAllSecuryNotes(userId);
  res.status(200).send(securyNotes);
};

export const getSecuryNote = async (req: Request, res: Response) => {
  const data: SecuryNotesLocalsGet = {
    token: res.locals.token,
    id: res.locals.notesId,
  };
  const securyNote = await securityNoteService.getSecuryNotesById(data);
  res.status(200).send(securyNote);
};

export const deleteSecuryNote = async (req: Request, res: Response) => {
  const data: SecuryNotesLocalsGet = {
    token: res.locals.token,
    id: res.locals.notesId,
  };
  const deleted = await securityNoteService.deleteSecuryNote(data);
  res.status(201).send(deleted);
};
