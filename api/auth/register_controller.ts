import { Response } from "express";
import { sendResponse } from "../utils";
import { IExtendedRequestWithUser } from "./jwt";
import { RegisterStaffSchema, RegisterUserSchema } from "./validator";
import { update_staff, update_user } from "../../db/user_ops";

export const RegisterControllerAlumni = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    const body = req.body;
    // validate the body
    const validatedBody = RegisterUserSchema.parse(body);

    // let payment_method: "ONLINE" | "CONSENT" | undefined;
    // if (validatedBody.reg_or_edit === "REGISTER") {
    //   payment_method = validatedBody.is_consent ? "CONSENT" : "ONLINE";
    // }

    // update the user
    const user = await update_user({
      id: req.user!.id,
      ...validatedBody,
    });
    // send the response
    return sendResponse(res, {
      status: 200,
      data: user,
      error: null,
    });
  } catch (e: any) {
    return sendResponse(res, {
      status: 500,
      data: null,
      error: e.message,
    });
  }
};

export const RegisterControllerStaff = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    const body = req.body;
    // validate the body
    const validatedBody = RegisterStaffSchema.parse(body);
    // update the user
    const user = await update_staff({
      id: req.user!.id,
      ...validatedBody,
    });
    // send the response
    return sendResponse(res, {
      status: 200,
      data: user,
      error: null,
    });
  } catch (e: any) {
    return sendResponse(res, {
      status: 500,
      data: null,
      error: e.message,
    });
  }
};
