import { z } from "zod";

export const RegisterUserSchema = z.object({
  name: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dob: z.date(),
  role: z.literal("ALUMNI"),
  institute_number: z.string(),
  joining_year: z.number(),
  graduation_year: z.number(),
  program: z.enum(["BTECH", "MTECH", "PHD"]),
  branch: z.string(),
  hostel_room_no: z.string(),
  mobile: z.string(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  work_experience: z.array(z.string()),
  skills: z.array(z.string()),
  address: z.string(),
  is_consent: z.boolean(),
});

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;

export type IUpdateUserData = RegisterUserSchemaType & { id: number, payment_method?: "ONLINE" | "CONSENT"};

export const RegisterStaffSchema = z.object({
  name: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dob: z.date(),
  role: z.enum(["VERIFICATION_STAFF", "PAYMENT_STAFF"]),
  institute_number: z.string(),
  joining_year: z.number(),
  mobile: z.string(),
})

export type RegisterStaffSchemaType = z.infer<typeof RegisterStaffSchema>;

export type IUpdateStaffData = RegisterStaffSchemaType & { id: number };
