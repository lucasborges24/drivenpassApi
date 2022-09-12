import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateUserToken } from "../types/authTypes";

dotenv.config();

export const checkTokenBelongsSomeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = res.locals.headers.authorization.split(" ")[1];

  const { JWT_SECRETKEY } = process.env;
  try {
    const data = jwt.verify(token, JWT_SECRETKEY!);
    res.locals.token = data;
    next();
  } catch (err) {
    res.status(404).send(`Internal system error.\n More details: ${err}`);
  }
};
