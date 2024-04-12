import { z } from "zod";

export const UpdateVerificationStatusSchema = z.object({
  id: z.number(),
  verification_status: z.boolean(),
});

export const UpdateMembershipStatusSchema = z.object({
  id: z.number(),
  membership_status: z.literal(true),
});
