import prisma from "../database";
import { SecuryNotesInsert } from "../types/securityNotesTypes";

export const insertSecurityNote = async (data: SecuryNotesInsert) => {
  const securyNote = await prisma.securyNotes.create({
    data: {
      userId: data.userId,
      title: data.title,
      description: data.description,
    },
  });
  return securyNote;
};

export const getSecuryNotesByIdAndTitle = async (id: number, title: string) => {
  const securyNote = await prisma.securyNotes.findFirst({
    where: {
      id: id,
      title: title,
    },
  });
  return securyNote;
};
