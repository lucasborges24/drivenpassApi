import { Request, Response } from "express";
import { authService } from "../services";

export const signIn = async (req: Request, res: Response) => {
  const token = await authService.signIn(res.locals.body);
  res.status(202).send(token);
};

export const signUp = async (req: Request, res: Response) => {
  const newUser = await authService.signUp(res.locals.body);
  const { email } = newUser;
  res.status(201).send({ email });
};
