import { Router } from "express";
import { cardController } from "../controllers";
import { validateParamsId } from "../middlewares/idMiddleware";
import {
  validateBodySchema,
  validateHeaderSchema,
} from "../middlewares/schemaMiddleware";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware";
import { CardSchema } from "../schemas/cardSchema";
import { tokenSchema } from "../schemas/tokenSchema";

const cardRouter = Router();

cardRouter.post(
  "/card/:userId",
  validateBodySchema(CardSchema),
  validateHeaderSchema(tokenSchema),
  validateParamsId("userId"),
  checkTokenBelongsSomeUser,
  cardController.insertCard
);

cardRouter.get(
  "/card",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  cardController.getAllCards
);

cardRouter.get(
  "/card/:cardId",
  validateHeaderSchema(tokenSchema),
  validateParamsId("cardId"),
  checkTokenBelongsSomeUser,
  cardController.getCard
);

cardRouter.delete(
  "/card/:cardId",
  validateHeaderSchema(tokenSchema),
  validateParamsId("cardId"),
  checkTokenBelongsSomeUser,
  cardController.deleteCard
);

export default cardRouter;
