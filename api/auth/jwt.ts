import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils";
import { COOKIE_NAME } from "./cookie";

export interface IJWTPayload {
  id: number;
  uuid: string;
  name: string;
  email: string;
  paid: boolean;
  role: string;
  is_member: boolean;
  is_verified: boolean;
}

export const getSignedToken = (
  payload: IJWTPayload,
  secret: string,
  options?: jwt.SignOptions
) => {
  return jwt.sign(payload, secret, options);
};

export const verify = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export const decode = (token: string) => {
  return jwt.decode(token);
};

// export const refresh = (token: string, secret: string, options?: jwt.SignOptions) => {
//   const decoded = decode(token);
//   if (decoded) {
//     return getSignedToken(decoded, secret, options);
//   }
//   return null;
// };

// export const verifyRefresh = (token: string, secret: string) => {
//   const decoded = decode(token) as IJWTPayload;
//   if (decoded) {
//     return verify(token, secret);
//   }
//   return null;
// };

// extend request interface
export interface IExtendedRequestWithUser extends Request {
  user?: IJWTPayload;
}

// jwt decode middleware
export const jwtVerifyMiddleware = (
  req: IExtendedRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
      throw new Error("No token found");
    }
    const decoded = verify(token, process.env.JWT_SECRET!) as IJWTPayload;
    if (decoded) {
      req.user = decoded;
    }
    next();
  } catch (e: any) {
    return sendResponse(res, {
      status: 500,
      data: null,
      error: e.message,
    });
  }
};

export const isAdmin = (
  req: IExtendedRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === "ADMIN") {
    next();
  } else {
    return sendResponse(res, {
      status: 403,
      data: null,
      error: "You're not an Admin",
    });
  }
};

export const isVerificationStaff = (
  req: IExtendedRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === "VERIFICATION_STAFF") {
    next();
  } else {
    return sendResponse(res, {
      status: 403,
      data: null,
      error: "You're not a Verification Staff Member",
    });
  }
};

export const isAccountsStaff = (
  req: IExtendedRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === "PAYMENT_STAFF") {
    next();
  } else {
    return sendResponse(res, {
      status: 403,
      data: null,
      error: "You're not an Accounts Staff Member",
    });
  }
};

export const isMember = (
  req: IExtendedRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.is_member) {
    next();
  } else {
    return sendResponse(res, {
      status: 403,
      data: null,
      error: "You're not a Member",
    });
  }
};

export const isVerified = (
  req: IExtendedRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.is_verified) {
    next();
  } else {
    return sendResponse(res, {
      status: 403,
      data: null,
      error: "You're not verified yet",
    });
  }
};

export const isPaid = (
  req: IExtendedRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.paid) {
    next();
  } else {
    return sendResponse(res, {
      status: 403,
      data: null,
      error: "You're not paid for the membership yet",
    });
  }
};

// check if staff
export const isStaff = (
  req: IExtendedRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (
    req.user?.role === "VERIFICATION_STAFF" ||
    req.user?.role === "PAYMENT_STAFF" ||
    req.user?.role === "ADMIN"
  ) {
    next();
  } else {
    return sendResponse(res, {
      status: 403,
      data: null,
      error: "You're not a Staff Member",
    });
  }
};
