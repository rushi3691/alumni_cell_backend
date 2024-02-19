import { Request, Response } from "express";
import {
  UpdateMembershipStatus,
  UpdateVerificationStatus,
} from "../../db/verification_ops";
import { sendResponse } from "../utils";
import { UpdateVerificationStatusSchema } from "./validator";
import { IExtendedRequestWithUser } from "../auth/jwt";

export const UpdateVerificationStatusController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  const { id } = UpdateVerificationStatusSchema.parse(req.body);
  try {
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

export const UpdateMembershipStatusController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  const { id, membership_status } = req.body;
  try {
    const user = await UpdateMembershipStatus(id, membership_status);
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
