import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string(),
  roll_number: z.string(),
  batch: z.string(),
  branch: z.string(),
  mobile: z.string(),
  is_consent: z.boolean(),
});
