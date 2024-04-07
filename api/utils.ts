interface ResponseData {
  status: number;
  data: any;
  error: any;
}
import type { Response } from "express";

export const sendResponse = (res: Response, responseData: ResponseData) => {
  res.status(responseData.status).json(responseData);
};
