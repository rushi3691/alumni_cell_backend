import { Router } from "express";
import { jwtVerifyMiddleware, isAccountsStaff, isVerified } from "../auth/jwt";
import { UpdatePaidStatusController } from "./accounts_controller";

const router = Router();

router.post(
  "/update-paid-status",
  jwtVerifyMiddleware,
  isAccountsStaff,
  isVerified,
  UpdatePaidStatusController
);

export default router;
