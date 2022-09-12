import { Router } from "express";
import { wifiController } from "../controllers";
import { validateParamsId } from "../middlewares/idMiddleware";
import { validateBodySchema, validateHeaderSchema } from "../middlewares/schemaMiddleware";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware";
import { tokenSchema } from "../schemas/tokenSchema";
import { wifiSchema } from "../schemas/wifiSchema";

const wifiRouter = Router();

wifiRouter.post(
  "/wifi/:userId",
  validateBodySchema(wifiSchema),
  validateHeaderSchema(tokenSchema),
  validateParamsId("userId"),
  checkTokenBelongsSomeUser,
  wifiController.createWifi
);

wifiRouter.get(
  "/wifi",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  wifiController.getAllWifis
);

wifiRouter.get(
  "/wifi/:wifiId",
  validateHeaderSchema(tokenSchema),
  validateParamsId("wifiId"),
  checkTokenBelongsSomeUser,
  wifiController.getWifi
);

wifiRouter.delete(
  "/wifi/:wifiId",
  validateHeaderSchema(tokenSchema),
  validateParamsId("wifiId"),
  checkTokenBelongsSomeUser,
  wifiController.deleteWifi
);

export default wifiRouter;
