import { Response } from "express";
import { GetAllUsers } from "../../db/verification_ops";
import { IExtendedRequestWithUser } from "../auth/jwt";
import { sendResponse } from "../utils";

export const GetAllUsersController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    const users = await GetAllUsers();
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
