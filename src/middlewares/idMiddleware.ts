import { NextFunction, Request, Response } from "express";

const validateParamsId = (enteredId: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id: number = Number(req.params[enteredId]);
    const NotANumber: boolean = isNaN(id);
    const isInteger: boolean = Number.isInteger(id);
    if (NotANumber || !isInteger) {
      const error: object = {
        type: "Not_Found",
        message: "id sent is not a integer number.",
      };
      throw error;
    }
    res.locals[enteredId] = id;
    next();
  };
};

const checkParamsMatchs = (id1: number, id2: number) => {
  if (id1 !== id2) {
    const error: object = {
      type: "Unauthorized",
      message: "Inconsistency in the ids sent.",
    };
    throw error;
  }
};

export { validateParamsId, checkParamsMatchs };
