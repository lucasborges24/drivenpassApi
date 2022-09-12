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
