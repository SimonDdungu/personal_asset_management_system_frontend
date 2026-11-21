import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(2, "First name required"),

  lastName: z.string().min(2, "Last name required"),

  email: z.email("Invalid email address"),

  phoneNumber: z.string().min(8, "Invalid phone number").max(16, "Invalid phone number").optional().or(z.literal("")),

  gender: z.enum(["MALE", "FEMALE"]),

  password: z.string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain an uppercase letter")
            .regex(/[a-z]/, "Password must contain a lowercase letter")
            .regex(/[0-9]/, "Password must contain a number")
            .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),

  confirmPassword: z.string().min(1, "Please confirm your password"),

  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signUpFormTypes = z.infer<typeof signUpSchema>;