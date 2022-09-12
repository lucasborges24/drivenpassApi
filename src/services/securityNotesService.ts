import { checkParamsMatchs } from "../middlewares/idMiddleware";
import { securityNoteRepository } from "../repositories";
import {
  ISecuryNotesLocals,
  SecuryNotesInsert,
  SecuryNotesLocalsGet,
} from "../types/securityNotesTypes";
import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

const { CRYPTR_KEY } = process.env;
const cryptr = new Cryptr(CRYPTR_KEY!);

export const insertSecurityNote = async (data: ISecuryNotesLocals) => {
  checkParamsMatchs(data.id, data.token.userId);
  await checkTitleAlreadyWasUsed(data.token.userId, data.body.title);
  const objectToInsert: SecuryNotesInsert = {
    userId: data.token.userId,
    title: data.body.title,
    description: data.body.description,
  };
  const securyNote = await securityNoteRepository.insertSecurityNote(
    objectToInsert
  );
  return securyNote;
};

export const getAllSecuryNotes = async (id: number) => {
  const securyNotes = await securityNoteRepository.getSecuryNotesByUserId(id);
  return securyNotes;
};

export const getSecuryNotesById = async (data: SecuryNotesLocalsGet) => {
  const securynote = await searchSecuryNotesById(data.id);
  checkParamsMatchs(securynote.userId, data.token.userId);
  return securynote;
};

export const deleteSecuryNote = async (data: SecuryNotesLocalsGet) => {
  const securyNote = await searchSecuryNotesById(data.id);
  checkParamsMatchs(securyNote.userId, data.token.userId);
  const deleted = await securityNoteRepository.deleteSecuryNote(data.id);
  return deleted;
};

export const checkTitleAlreadyWasUsed = async (id: number, title: string) => {
  const securityNote = await securityNoteRepository.getSecuryNotesByIdAndTitle(
    id,
    title
  );
  if (securityNote) {
    const error: object = {
      type: "Conflit",
      message: "Já existe nota com este título.",
    };
    throw error;
  }
  return;
};

export const searchSecuryNotesById = async (id: number) => {
  const securyNote = await securityNoteRepository.getSecuryNoteById(id);
  if (!securyNote) {
    const error: object = {
      type: "Not_Found",
      message: "Credencial Não existe.",
    };
    throw error;
  }
  return securyNote;
};
