import { Router } from "express";
import { authController } from "../controllers";

import { validateBodySchema } from "../middlewares/schemaMiddleware";
import { signInSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateBodySchema(signUpSchema),
  authController.signUp
);

authRouter.post(
  "/signin",
  validateBodySchema(signInSchema),
  authController.signIn
);

export default authRouter;
