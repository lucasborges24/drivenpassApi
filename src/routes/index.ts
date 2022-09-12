import { Router } from "express";
import authRouter from "./authRoute";
import credentialRouter from "./credentialRoute";

const router = Router();

router.use(authRouter);
router.use(credentialRouter);

export default router;
