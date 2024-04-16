import { User } from "@prisma/client";
import { getSignedToken } from "./jwt";
import { CookieOptions, Response } from "express";

export const COOKIE_NAME = "aa_token";

export const generate_cookie = (res: Response, user: User) => {
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
    domain: process.env.NODE_ENV === "production" ? ".iitgoa.ac.in" : undefined,
    expires: new Date(Date.now() + 86100000), // 1day
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  return res.cookie(COOKIE_NAME, new_token, cookieOptions);
};
