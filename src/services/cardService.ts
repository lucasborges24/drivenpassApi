import { checkParamsMatchs } from "../middlewares/idMiddleware";
import { cardRepositoy } from "../repositories";
import { ICardInsert, ICardLocals } from "../types/cardTypes";
import dotenv from "dotenv";
import Cryptr from "cryptr";

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
