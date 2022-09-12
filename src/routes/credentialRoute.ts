import { Router } from "express";
import { credentialCrontroller } from "../controllers";
import { validateParamsId } from "../middlewares/idMiddleware";
import {
  validateBodySchema,
  validateHeaderSchema,
} from "../middlewares/schemaMiddleware";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware";
import { credentialSchema } from "../schemas/credentialSchema";
import { tokenSchema } from "../schemas/tokenSchema";

const credentialRouter = Router();

credentialRouter.post(
  "/credentials/:userId",
  validateBodySchema(credentialSchema),
  validateHeaderSchema(tokenSchema),
  validateParamsId("userId"),
  checkTokenBelongsSomeUser,
  credentialCrontroller.createCredential
);

credentialRouter.get(
  "/credentials",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  credentialCrontroller.getAllCredentials
);

credentialRouter.get(
  "/credentials/:credentialId",
  validateHeaderSchema(tokenSchema),
  validateParamsId("credentialId"),
  checkTokenBelongsSomeUser,
  credentialCrontroller.getCredential
);

export default credentialRouter;
