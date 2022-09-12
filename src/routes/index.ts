import { Router } from "express";
import authRouter from "./authRoute";
import cardRouter from "./cardRoute";
import credentialRouter from "./credentialRoute";
import securityRouter from "./securityNotesRoute";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(securityRouter);
router.use(cardRouter);

export default router;
