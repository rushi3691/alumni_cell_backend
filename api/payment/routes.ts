import { Router } from "express";
import crypto from "crypto";

import {
  ConsentController,
  CreateOrderController,
  verify_payment,
} from "./controller";
import { jwtVerifyMiddleware } from "../auth/jwt";

const router = Router();

router.post("/create-order", jwtVerifyMiddleware, CreateOrderController);

router.post("/success", verify_payment);

router.post("/paymentCapture", (req, res) => {
  const secret_key = "1234567890";
  const data = crypto.createHmac("sha256", secret_key);
  data.update(JSON.stringify(req.body));
  const digest = data.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // console.log(req.body);
    // console.log(req.body.payload.payment.entity);
    // console.log(req.body.payload.payment.entity);
    //     {
    //   entity: "event",
    //   account_id: "acc_Nsx1AG19gMdscI",
    //   event: "payment.captured",
    //   contains: [ "payment" ],
    //   payload: {
    //     payment: {
    //       entity: [Object ...],
    //     },
    //   },
    //   created_at: 1712406186,
    // }

    const payment = req.body.payload.payment.entity;
    console.log(payment);

    res.json({
      status: "ok",
    });
  } else {
    res.status(400).send("Invalid signature");
  }
});

router.post("/give-consent", jwtVerifyMiddleware, ConsentController);

export default router;
