import { Router } from "express";

import { isAdmin, jwtVerifyMiddleware } from "../auth/jwt";
import {
  GetStaffController,
  UpdateStaffVerificationStatusController,
} from "./admin_controller";

const router = Router();

router.post(
  "/update-verification-status",
  jwtVerifyMiddleware,
  isAdmin,
  UpdateStaffVerificationStatusController
);

router.post("/get-staff", jwtVerifyMiddleware, isAdmin, GetStaffController);

export default router;
