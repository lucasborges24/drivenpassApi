import { Request, Response } from "express";
import { cardService } from "../services";
import { ICardLocals } from "../types/cardTypes";

export const insertCard = async (req: Request, res: Response) => {
  const data: ICardLocals = {
    body: res.locals.body,
    token: res.locals.token,
    id: res.locals.userId,
  };
  const insertedCard = await cardService.insertCard(data);
  res.status(201).send("insertedCard");
};
export const getAllCards = async (req: Request, res: Response) => {
  res.status(201).send("cards");
};
export const getCard = async (req: Request, res: Response) => {
  res.status(201).send("card");
};
export const deleteCard = async (req: Request, res: Response) => {
  res.status(201).send("deletedCard");
};
