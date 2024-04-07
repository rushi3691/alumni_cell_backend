import { Router } from "express";

import { isStaff, isVerified, jwtVerifyMiddleware } from "../auth/jwt";
import { GetAllUsersController } from "./staff_controller";

const router = Router();

/**
 * @swagger
 * /staff-common/all-users:
 *   get:
 *     tags:
 *       - common staff operations
 *     summary: Get all users' data
 *     description: Get all users' data
 *     parameters:
 *       - in: cookie
 *         name: my_token
 *         schema:
 *           type: string
 *         required: true
 *         description: JWT token
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: not found
 *       '500':
 *         description: Internal server error
 */
router.get(
  "/all-users",
  jwtVerifyMiddleware,
  isStaff,
  isVerified,
  GetAllUsersController
);

export default router;
