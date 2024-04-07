import { Response } from "express";
import { GetAllUsers, GetTotalUsersCount } from "../../db/verification_ops";
import { IExtendedRequestWithUser } from "../auth/jwt";
import { sendResponse } from "../utils";
import { queryParamsSchema } from "./validator";

export const GetAllUsersController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    // get limit and offset from query params
    const { limit, offset } = queryParamsSchema.parse(req.query);

    const users = await GetAllUsers(limit, offset);
    return sendResponse(res, {
      status: 200,
      data: users,
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

// get users count
export const GetTotalUsersCountController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    const count = await GetTotalUsersCount();
    return sendResponse(res, {
      status: 200,
      data: { count },
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
