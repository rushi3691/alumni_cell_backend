import { Orders } from "razorpay/dist/types/orders";
import prisma from "./db";
import { Payments } from "razorpay/dist/types/payments";

export const create_order = async (
  order: Orders.RazorpayOrder,
  userId: number,
  reason: "MEMBERSHIP" | "DONATION"
) => {
  const order_ = await prisma.payment.create({
    data: {
      amount: order.amount as number,
      order_id: order.id,
      status: order.status,
      userId: userId,
      reason: reason,
    },
  });
  return order_;
};

export const update_order = async (
  order: Orders.RazorpayOrder,
  payment: Payments.RazorpayPayment
) => {
  const order_ = await prisma.payment.update({
    where: {
      order_id: order.id,
    },
    data: {
      status: order.status,
      payment_id: payment.id,
      payment_data: payment as any,
    },
  });
  return order_;
};
