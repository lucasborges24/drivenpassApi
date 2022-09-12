import prisma from "../database";
import {
  SecuryNotesInsert,
  SecuryNotesLocalsGet,
} from "../types/securityNotesTypes";

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

export const getSecuryNoteById = async (id: number) => {
  const securyNote = await prisma.securyNotes.findUnique({
    where: {
      id: id,
    },
  });
  return securyNote;
};

export const deleteSecuryNote = async (id: number) => {
  const deleted = await prisma.securyNotes.delete({
    where: {
      id: id,
    },
  });
  return deleted;
};

export const getSecuryNotesByIdAndTitle = async (id: number, title: string) => {
  const securyNote = await prisma.securyNotes.findFirst({
    where: {
      userId: id,
      title: title,
    },
  });
  return securyNote;
};

export const getSecuryNotesByUserId = async (id: number) => {
  const securyNotes = await prisma.securyNotes.findMany({
    where: {
      userId: id,
    },
  });
  return securyNotes;
};
