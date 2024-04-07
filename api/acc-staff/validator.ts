import { z } from "zod";

export const UpdatePaidStatusSchema = z.object({
  id: z.number(),
});
