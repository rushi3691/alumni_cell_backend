import { Router } from "express";

import { isVerificationStaff, jwtVerifyMiddleware } from "../auth/jwt";
import {
  UpdateMembershipStatusController,
  UpdateVerificationStatusController,
} from "./verification_controller";

const router = Router();

router.post(
  "/update-verification-status",
  jwtVerifyMiddleware,
  isVerificationStaff,
  UpdateVerificationStatusController
);

router.post(
  "/update-membership-status",
  jwtVerifyMiddleware,
  isVerificationStaff,
  UpdateMembershipStatusController
);

export default router;
