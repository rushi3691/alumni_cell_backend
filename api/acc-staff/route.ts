import { Router } from "express";
import { jwtVerifyMiddleware, isAccountsStaff } from "../auth/jwt";
import { UpdatePaidStatusController } from "./accounts_controller";

const router = Router();

router.post(
  "/update-paid-status",
  jwtVerifyMiddleware,
  isAccountsStaff,
  UpdatePaidStatusController
);

export default router;
