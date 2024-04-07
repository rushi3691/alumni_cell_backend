import { Router } from "express";

import { isVerificationStaff, isVerified, jwtVerifyMiddleware } from "../auth/jwt";
import {
  UpdateMembershipStatusController,
  UpdateVerificationStatusController,
} from "./verification_controller";

const router = Router();

router.post(
  "/update-verification-status",
  jwtVerifyMiddleware,
  isVerificationStaff,
  isVerified,
  UpdateVerificationStatusController
);

router.post(
  "/update-membership-status",
  jwtVerifyMiddleware,
  isVerificationStaff,
  isVerified,
  UpdateMembershipStatusController
);

export default router;
