import { CookieOptions, Response } from "express";
import { create_user, get_user_by_uuid } from "../../db/user_ops";
import { ExtendedRequest } from "./custom_types";
import { sendResponse } from "../types";
import { getSignedToken } from "./jwt";


export const LoginController = async (req: ExtendedRequest, res: Response) => {
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

    // set cookie
    // const res_w_cookies = res.cookie("token", new_token, cookieOptions);

    // return sendResponse(res_w_cookies, {
    //   status: 200,
    //   data: user,
    //   error: null,
    // });

    const cookieOptions: CookieOptions = {
      sameSite: "none",
      path: "/",
      expires: new Date(Date.now() + 86100000), // 1day
      httpOnly: true,
      secure: true,
    };

    
    res.cookie("my_token", new_token, cookieOptions).json({
      status: 200,
      data: user,
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
