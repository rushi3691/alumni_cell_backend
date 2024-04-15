import { Request, Response } from "express";
import { create_user, get_user_by_uuid } from "../../db/user_ops";
import { IExtendedRequest } from "./custom_types";
import { sendResponse } from "../utils";
import { COOKIE_NAME, generate_cookie } from "./cookie";

export const LoginController = async (req: IExtendedRequest, res: Response) => {
  try {
    const body = req.body;
    if (!req.user_uuid || !req.user_name || !req.email) {
      return sendResponse(res, {
        status: 400,
        data: null,
        error: "Invalid request",
      });
    }

    let user = await get_user_by_uuid(req.user_uuid);
    if (!user) {
      user = await create_user({
        uuid: req.user_uuid,
        email: req.email,
        name: req.user_name,
      });
    }

    return sendResponse(generate_cookie(res, user), {
      status: 200,
      data: user,
      error: null,
    });
  } catch (error: any) {
    return sendResponse(res, {
      status: 500,
      data: null,
      error: error.message,
    });
  }
};

export const LogoutController = async (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
  return sendResponse(res, {
    status: 200,
    data: null,
    error: null,
  });
};
