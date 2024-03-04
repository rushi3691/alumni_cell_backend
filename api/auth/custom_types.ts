import { Request } from "express";

export interface ExtendedRequest extends Request {
  user_uuid?: string;
  user_name?: string;
  email?: string;
}
