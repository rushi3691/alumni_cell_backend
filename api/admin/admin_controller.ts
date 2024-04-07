import { Response } from "express";
import { UpdateVerificationStatus } from "../../db/verification_ops";
import { IExtendedRequestWithUser } from "../auth/jwt";
import { sendResponse } from "../utils";
import { UpdateVerificationStatusSchema } from "./validator";
import { get_staff } from "../../db/admin_ops";

export const UpdateStaffVerificationStatusController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    const { id } = UpdateVerificationStatusSchema.parse(req.body);
    const user = await UpdateVerificationStatus(id, req.user!.name);
    return sendResponse(res, {
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

export const GetStaffController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    const users = await get_staff();
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
