import { Router } from "express";
import { GoogleAuthMiddleware } from "./google_auth";
import { LoginController } from "./login_controller";
import { jwtVerifyMiddleware } from "./jwt";
import { RegisterController } from "./register_controller";

const router = Router();

router.post("/login", GoogleAuthMiddleware, LoginController);
router.post("/register", jwtVerifyMiddleware, RegisterController)

export default router;
