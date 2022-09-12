import { checkParamsMatchs } from "../middlewares/idMiddleware";
import { cardRepositoy } from "../repositories";
import { ICardInsert, ICardLocals, ICardLocalsGet } from "../types/cardTypes";
import dotenv from "dotenv";
import Cryptr from "cryptr";
import { cards } from "@prisma/client";

dotenv.config();

const { CRYPTR_KEY } = process.env;
const cryptr = new Cryptr(CRYPTR_KEY!);

export const insertCard = async (data: ICardLocals) => {
  checkParamsMatchs(data.id, data.token.userId);
  await checkTitleAlreadyWasUsed(data.token.userId, data.body.title);
  const encryptedKey = await encryptParamByCryptr(data.body.password);
  const objectToInsert: ICardInsert = {
    number: data.body.number,
    cardholderName: data.body.cardholderName,
    securityCode: data.body.securityCode,
    expirationDate: data.body.expirationDate,
    password: encryptedKey,
    isVirtual: data.body.isVirtual,
    type: data.body.type,
    title: data.body.title,
    userId: data.token.userId,
  };
  const insertedCard = await cardRepositoy.insertCard(objectToInsert);
  return insertedCard;
};

export const getAllCards = async (id: number) => {
  const cards = await cardRepositoy.getCardsByUserId(id);
  const uncryptCards = uncryptParams(cards);
  return uncryptCards;
};

export const getCard = async (data: ICardLocalsGet) => {
  const card = await searchCardById(data.id);
  checkParamsMatchs(card.userId, data.token.userId);
  const uncryptCard = uncryptObject(card);
  return uncryptCard;
};

export const deleteCard = async (data: ICardLocalsGet) => {
  const card = await searchCardById(data.id);
  checkParamsMatchs(card.userId, data.token.userId);
  const deleted = await cardRepositoy.deleteCardById(data.id);
  return deleted
};

export const checkTitleAlreadyWasUsed = async (id: number, title: string) => {
  const card = await cardRepositoy.getCardByIdAndTitle(id, title);
  if (card) {
    const error: object = {
      type: "Conflit",
      message: "Já existe cartão com este título.",
    };
    throw error;
  }
  return;
};

export const encryptParamByCryptr = async (key: string) => {
  const encryptedKey = cryptr.encrypt(key);
  return encryptedKey;
};

export const uncryptParams = (keys: cards[]) => {
  try {
    const uncryptArray = keys.map((item) => {
      const newObject = {
        ...item,
        password: cryptr.decrypt(item["password"]),
      };
      return newObject;
    });
    return uncryptArray;
  } catch (error) {
    throw error;
  }
};

export const searchCardById = async (id: number) => {
  const card = await cardRepositoy.getCardById(id);
  if (!card) {
    const error: object = {
      type: "Not_Found",
      message: "Credencial Não existe.",
    };
    throw error;
  }
  return card;
};

export const uncryptObject = (object: cards) => {
  try {
    const uncrypt = {
      ...object,
      password: cryptr.decrypt(object["password"]),
    };
    return uncrypt;
  } catch (error) {
    throw error;
  }
};
