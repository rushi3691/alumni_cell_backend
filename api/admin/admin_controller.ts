import { Response } from "express";
import {
  UpdateMembershipStatus,
  UpdateVerificationStatus,
} from "../../db/verification_ops";
import { IExtendedRequestWithUser } from "../auth/jwt";
import { sendResponse } from "../utils";
import {
  UpdateMembershipStatusSchema,
  UpdateVerificationStatusSchema,
} from "./validator";
import { get_staff } from "../../db/admin_ops";

export const UpdateStaffVerificationStatusController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    const { id, verification_status } = UpdateVerificationStatusSchema.parse(
      req.body
    );
    const user = await UpdateVerificationStatus(
      id,
      verification_status,
      req.user!.name
    );
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

export const UpdateMembershipStatusController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    const { id, membership_status } = UpdateMembershipStatusSchema.parse(
      req.body
    );
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
