import { Router } from "express";

import { isVerificationStaff, jwtVerifyMiddleware } from "../auth/jwt";


const router = Router();

router.get("/", jwtVerifyMiddleware, isVerificationStaff);

export default router;
