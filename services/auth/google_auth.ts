import { OAuth2Client } from "google-auth-library";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils";
import { ExtendedRequest } from "./custom_types";

const clientIdWeb = Bun.env["CLIENT_ID_WEB"];
const clientSecret = Bun.env["CLIENT_SECRET"];

if (!clientIdWeb  || !clientSecret) {
  throw new Error("Missing Google OAuth2 credentials");
}

const oAuth2Client = new OAuth2Client(clientIdWeb, clientSecret, "postmessage");


export const GoogleAuthMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: req.body.idToken,
      audience: [clientIdWeb], // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Invalid token");
    }
    console.log(payload)
    // console.log(payload)
    req.user_uuid = payload["sub"];
    req.user_name = payload["name"];
    req.email = payload["email"];

    next();
  } catch (e) {
    console.error(e);
    sendResponse(res, {
      status: 401,
      data: null,
      error: "Unauthorized",
    });
  }
};

