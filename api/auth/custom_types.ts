import { Request } from "express";

export interface IExtendedRequest extends Request {
  user_uuid?: string;
  user_name?: string;
  email?: string;
}
