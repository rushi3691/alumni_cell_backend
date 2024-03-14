import { Response } from "express";
import { IExtendedRequestWithUser } from "../auth/jwt";
import { sendResponse } from "../utils";
import { UpdatePaidStatusSchema } from "./validator";
import { UpdatePaidStatus } from "../../db/accounts_ops";



export const UpdatePaidStatusController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    const { id } = UpdatePaidStatusSchema.parse(req.body);
    const user = await UpdatePaidStatus(id, req.user!.name);
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