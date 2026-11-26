import { z } from "zod";

export const loginSchema = z.object({

  email: z.email("Invalid email address").min(4, "Email is required"),

  password: z.string("Password is required").min(2, "Password is required")

})

export type loginFormTypes = z.infer<typeof loginSchema>;