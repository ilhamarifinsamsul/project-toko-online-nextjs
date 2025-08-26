// validation with zod
import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});
