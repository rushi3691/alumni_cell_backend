import { User } from "@prisma/client";
import { getSignedToken } from "./jwt";
import { CookieOptions, Response } from "express";

export const generate_cookie = (res: Response, user: User) => {
  // delete old cookie
//   res.clearCookie("my_token");
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
  return res.cookie("my_token", new_token, cookieOptions);
};
