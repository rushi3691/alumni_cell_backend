import { Router } from "express";
import { GoogleAuthMiddleware } from "./google_auth";
import { LoginController } from "./login_controller";
import { jwtVerifyMiddleware } from "./jwt";
import { RegisterController } from "./register_controller";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   get:
 *     tags:
 *       - auth
 *     summary: Login with google
 *     description: Login with google
 *     parameters:
 *       - in: body
 *         name: idToken
 *         schema:
 *           type: string
 *         required: true
 *         description: Google idToken
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: not found
 *       '500':
 *         description: Internal server error
 */
router.post("/login", GoogleAuthMiddleware, LoginController);

//  name: z.string(),
//   roll_number: z.string(),
//   batch: z.string(),
//   branch: z.string(),
//   mobile: z.string(),
//   is_consent: z.boolean(),
/**
 * @swagger
 * /auth/register:
 *   get:
 *     tags:
 *       - auth
 *     summary: Register user
 *     description: Register user
 *     parameters:
 *       - in: body
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: user's name
 *       - in: body
 *         name: roll_number
 *         schema:
 *           type: string
 *         required: true
 *         description: user's roll number
 *       - in: body
 *         name: batch
 *         schema:
 *           type: string
 *         required: true
 *         description: user's batch
 *       - in: body
 *         name: branch
 *         schema:
 *           type: string
 *         required: true
 *         description: user's branch
 *       - in: body
 *         name: mobile
 *         schema:
 *           type: string
 *         required: true
 *         description: user's mobile number
 *       - in: body
 *         name: is_consent
 *         schema:
 *           type: string
 *         required: true
 *         description: user's consent
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
router.post("/register", jwtVerifyMiddleware, RegisterController);

export default router;
