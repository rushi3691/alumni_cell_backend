import { Router } from "express";
import { GoogleAuthMiddleware } from "./google_auth";
import { LoginController } from "./login";

const router = Router();

router.post("/login", GoogleAuthMiddleware, LoginController);

export default router;
