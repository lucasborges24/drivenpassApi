import { Router } from "express";
import { securityNoteController } from "../controllers";
import { validateParamsId } from "../middlewares/idMiddleware";
import {
  validateBodySchema,
  validateHeaderSchema,
} from "../middlewares/schemaMiddleware";
import { checkTokenBelongsSomeUser } from "../middlewares/tokenMiddleware";
import { securityNotesSchema } from "../schemas/securityNotesSchema";
import { tokenSchema } from "../schemas/tokenSchema";

const securityRouter = Router();

securityRouter.post(
  "/securityNotes/:userId",
  validateBodySchema(securityNotesSchema),
  validateHeaderSchema(tokenSchema),
  validateParamsId("userId"),
  checkTokenBelongsSomeUser,
  securityNoteController.postSecurityNote
);

securityRouter.get(
  "/securityNotes",
  validateHeaderSchema(tokenSchema),
  checkTokenBelongsSomeUser,
  securityNoteController.getAllSecuryNotes
);

securityRouter.get(
  "/securityNotes/:notesId",
  validateHeaderSchema(tokenSchema),
  validateParamsId("notesId"),
  checkTokenBelongsSomeUser,
  securityNoteController.getSecuryNote
);

securityRouter.delete(
  "/securityNotes/:notesId",
  validateHeaderSchema(tokenSchema),
  validateParamsId("notesId"),
  checkTokenBelongsSomeUser,
  securityNoteController.deleteSecuryNote
);

export default securityRouter;
