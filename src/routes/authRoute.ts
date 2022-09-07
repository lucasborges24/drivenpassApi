import { Router } from "express";

const authRouter = Router();

authRouter.get("/login", () => console.log("oi meu chapa"));

export default authRouter;
