import { z } from "zod";

// const RegisterSchema = z.object({
//   is_consent: z.boolean(),
//   reg_or_edit: z.literal("REGISTER"),
// });

// const EditSchema = z.object({
//   reg_or_edit: z.literal("EDIT"),
// });

// const RegisterEditSchema = z.union([RegisterSchema, EditSchema]);

export const RegisterUserSchema = z
  .object({
    name: z.string(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    dob: z.coerce.date(),
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
    work_experience: z.string(),
    skills: z.array(z.string()),
    address: z.string(),
    // reg_or_edit: z.enum(["REGISTER", "EDIT"]),
  })
  // .and(RegisterEditSchema);

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;

export type IUpdateUserData = RegisterUserSchemaType & {
  id: number;
  // payment_method?: "ONLINE" | "CONSENT";
};

export const RegisterStaffSchema = z.object({
  name: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  dob: z.coerce.date(),
  role: z.enum(["VERIFICATION_STAFF", "PAYMENT_STAFF"]),
  institute_number: z.string(),
  mobile: z.string(),
});

export type RegisterStaffSchemaType = z.infer<typeof RegisterStaffSchema>;

export type IUpdateStaffData = RegisterStaffSchemaType & { id: number };
