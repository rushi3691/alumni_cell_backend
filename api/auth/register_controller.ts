import { Response } from "express";
import { sendResponse } from "../utils";
import { IExtendedRequestWithUser } from "./jwt";
import { RegisterUserSchema } from "./validator";
import { update_user } from "../../db/user_ops";

export const RegisterController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  try {
    const body = req.body;
    // validate the body
    const validatedBody = RegisterUserSchema.parse(body);
    // update the user
    const user = await update_user({
      id: req.user!.id,
      ...validatedBody,
      payment_method: validatedBody.is_consent ? "CONSENT" : "ONLINE",
      paid: false,
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
