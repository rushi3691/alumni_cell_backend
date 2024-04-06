import { Router } from "express";

import { isAdmin, jwtVerifyMiddleware } from "../auth/jwt";
import { UpdateStaffVerificationStatusController } from "./admin_controller";

const router = Router();

router.post(
  "/update-verification-status",
  jwtVerifyMiddleware,
  isAdmin,
  UpdateStaffVerificationStatusController
);
export default router;
