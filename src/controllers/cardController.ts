import { Request, Response } from "express";
import { rmSync } from "fs";
import { cardService } from "../services";
import { ICardLocals, ICardLocalsGet } from "../types/cardTypes";

export const insertCard = async (req: Request, res: Response) => {
  const data: ICardLocals = {
    body: res.locals.body,
    token: res.locals.token,
    id: res.locals.userId,
  };
  const insertedCard = await cardService.insertCard(data);
  res.status(201).send(insertedCard);
};
export const getAllCards = async (req: Request, res: Response) => {
  const { userId }: { userId: number } = res.locals.token;
  const cards = await cardService.getAllCards(userId);
  res.status(200).send(cards);
};
export const getCard = async (req: Request, res: Response) => {
  const data: ICardLocalsGet = {
    token: res.locals.token,
    id: res.locals.cardId,
  };
  const card = await cardService.getCard(data);
  res.status(200).send(card);
};
export const deleteCard = async (req: Request, res: Response) => {
  const data: ICardLocalsGet = {
    token: res.locals.token,
    id: res.locals.cardId,
  };
  const deletedCard = await cardService.deleteCard(data);
  res.status(201).send(deletedCard);
};
