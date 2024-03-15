import { Router } from "express";

import { isStaff, jwtVerifyMiddleware } from "../auth/jwt";
import { GetAllUsersController } from "./staff_controller";


const router = Router();

router.get(
  "/all-users",
  jwtVerifyMiddleware,
  isStaff,
  GetAllUsersController
);

export default router;