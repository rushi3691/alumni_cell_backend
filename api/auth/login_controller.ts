import { CookieOptions, Response } from "express";
import { create_user, get_user_by_uuid } from "../../db/user_ops";
import { IExtendedRequest } from "./custom_types";
import { sendResponse } from "../utils";
import { getSignedToken } from "./jwt";



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
    let new_user = false;
    if (!user) {
      user = await create_user({
        uuid: req.user_uuid,
        email: req.email,
        name: req.user_name,
      });
      new_user = true;
    }

    const new_token = getSignedToken(
      {
        id: user.id,
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        paid: user.paid,
        role: user.role,
        is_member: user.isMember,
        is_verified: user.isVerified,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const cookieOptions: CookieOptions = {
      sameSite: process.env.NODE_ENV === "production" && "strict",
      path: "/",
      expires: new Date(Date.now() + 86100000), // 1day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    
    res.cookie("my_token", new_token, cookieOptions).json({
      status: 200,
      data: {...user, new_user},
      error: null,
    });


  } catch (error: any) {
    return sendResponse(res, {
      status: 500,
      data: null,
      error: "Internal Server Error",
    });
  }
};
