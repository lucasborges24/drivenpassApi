import { Router } from "express";
import authRouter from "./authRoute";
import credentialRouter from "./credentialRoute";
import securityRouter from "./securityNotesRoute";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);
router.use(securityRouter);

export default router;
