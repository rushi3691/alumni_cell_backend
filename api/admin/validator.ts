import { z } from "zod";

export const UpdateVerificationStatusSchema = z.object({
  id: z.number(),
});
