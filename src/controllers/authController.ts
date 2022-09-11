import { Request, Response } from "express";
import { authService } from "../services";

export const signIn = async (req: Request, res: Response) => {
  const { password, email } = res.locals.body;
  res.status(200).send("token");
};

export const signUp = async (req: Request, res: Response) => {
  const newUser = await authService.signUp(res.locals.body);
  const { email } = newUser;
  res.status(201).send({email});
};
