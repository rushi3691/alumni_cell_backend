import { z } from "zod";

const donationOrder = z.object({
  order_type: z.literal("DONATION"),
  amount: z.number(),
});

const membershipOrder = z.object({
  order_type: z.literal("MEMBERSHIP"),
});

export const OrderSchema = z.union([donationOrder, membershipOrder]);

