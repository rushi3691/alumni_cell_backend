import { Orders } from "razorpay/dist/types/orders";
import { IExtendedRequestWithUser } from "../auth/jwt";
import { Response } from "express";
import { razorpay } from "./razorpary";
import { create_order, update_order } from "../../db/payment_ops";
import { sendResponse } from "../utils";
import crypto from "crypto";
import { update_user_paid_status } from "../../db/user_ops";
import { IExtendedRequest } from "../auth/custom_types";
import { OrderSchema } from "./validator";
import { generate_cookie } from "../auth/cookie";

export const CreateOrderController = async (
  req: IExtendedRequestWithUser,
  res: Response
) => {
  // setting up options for razorpay order.
  try {
    const req_body = OrderSchema.parse(req.body);

    const options: Orders.RazorpayOrderCreateRequestBody = {
      // amount in smallest currency unit, 5000 rs = 500000 paise
      // amount: 5000 * 100,
      amount:
        req_body.order_type === "MEMBERSHIP"
          ? 5000 * 100
          : req_body.amount * 100,
      currency: "INR",
      receipt: "receipt#1", // add a receipt number
      // payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);

    // store the order in the database
    await create_order(order, req.user!.id, req_body.order_type);

    return sendResponse(res, {
      data: {
        order_id: order.id,
        currency: order.currency,
        amount: order.amount,
      },
      status: 200,
      error: null,
    });
  } catch (err) {
    return sendResponse(res, {
      data: null,
      status: 400,
      error: "Couldn't create order. Please try again!",
    });
  }
};

export const verify_payment = async (req: IExtendedRequest, res: Response) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const shasum = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET!
    );
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature) {
      return sendResponse(res, {
        data: null,
        status: 400,
        error: "Transaction not legit!",
      });
    }
    const payment = await razorpay.payments.fetch(razorpayPaymentId);
    const order = await razorpay.orders.fetch(razorpayOrderId);

    console.log("order", order);
    console.log("payment", payment);

    const order_stored = await update_order(order, payment);
    if (order_stored.reason === "MEMBERSHIP") {
      const user = await update_user_paid_status(order_stored.userId);
      return sendResponse(generate_cookie(res, user), {
        data: {
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
          user: user,
        },
        status: 200,
        error: null,
      });
    }

    return sendResponse(res, {
      data: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
      },
      status: 200,
      error: null,
    });
  } catch (error: any) {
    return sendResponse(res, {
      data: null,
      status: 500,
      error: error.message,
    });
  }
};
