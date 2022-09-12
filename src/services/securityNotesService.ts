import { checkParamsMatchs } from "../middlewares/idMiddleware";
import { securityNoteRepository } from "../repositories";
import {
  ISecuryNotesLocals,
  SecuryNotesInsert,
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
