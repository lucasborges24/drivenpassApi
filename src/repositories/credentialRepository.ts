import prisma from "../database";
import { ICredentialInsert } from "../types/credentialType";

export const insertCredential = async (data: ICredentialInsert) => {
  const credential = await prisma.credentials.create({
    data: {
      url: data.url,
      username: data.username,
      password: data.password,
      title: data.title,
      userId: data.userId,
    },
  });
  return credential;
};

export const getCredentialByIdAndTitle = async (id: number, title: string) => {
  const credential = await prisma.credentials.findFirst({
    where: {
      userId: id,
      title: title,
    },
  });
  return credential;
};

export const getCredentialsByUserId = async (id: number) => {
  const credentials = await prisma.credentials.findMany({
    where: {
      userId: id,
    },
  });
  return credentials;
};

export const getCredentialById = async (id: number) => {
  const credential = await prisma.credentials.findUnique({
    where: {
      id: id,
    },
  });
  return credential;
};

export const deleteCredentialById = async (id: number) => {
  const deleted = await prisma.credentials.delete({
    where: {
      id: id,
    },
  });
  return deleted;
};
