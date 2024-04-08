import { Router } from "express";

import { isAdmin, jwtVerifyMiddleware } from "../auth/jwt";
import {
  GetStaffController,
  UpdateMembershipStatusController,
  UpdateStaffVerificationStatusController,
} from "./admin_controller";

const router = Router();

router.post(
  "/update-verification-status",
  jwtVerifyMiddleware,
  isAdmin,
  UpdateStaffVerificationStatusController
);

router.get("/get-staff", jwtVerifyMiddleware, isAdmin, GetStaffController);

router.post(
  "/update-membership-status",
  jwtVerifyMiddleware,
  isAdmin,
  UpdateMembershipStatusController
);


export default router;
