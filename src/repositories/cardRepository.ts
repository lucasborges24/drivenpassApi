import prisma from "../database";
import { ICardInsert } from "../types/cardTypes";

export const insertCard = async (data: ICardInsert) => {
  const card = await prisma.cards.create({
    data: {
      number: data.number,
      cardholderName: data.cardholderName,
      securityCode: data.securityCode,
      expirationDate: data.expirationDate,
      password: data.password,
      isVirtual: data.isVirtual,
      type: data.type,
      title: data.title,
      userId: data.userId,
    },
  });
  return card;
};

export const getCardByIdAndTitle = async (id: number, title: string) => {
  const card = await prisma.cards.findFirst({
    where: {
      userId: id,
      title: title,
    },
  });
  return card;
};

//   export const getCardsByUserId = async (id: number) => {
//     const credentials = await prisma.credentials.findMany({
//       where: {
//         userId: id,
//       },
//     });
//     return credentials;
//   };

//   export const getCardById = async (id: number) => {
//     const credential = await prisma.credentials.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     return credential;
//   };

//   export const deleteCardById = async (id: number) => {
//     const deleted = await prisma.credentials.delete({
//       where: {
//         id: id,
//       },
//     });
//     return deleted;
//   };
