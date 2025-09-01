// validation with zod
import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const schemaCategory = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
});

export const schemaLocation = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
});

export const schemaBrand = schemaCategory.extend({
  image: z
    .any()
    .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "Invalid file type",
    })
    .refine((file: File) => file.size <= 3 * 1024 * 1024, {
      message: "File size must be less than 3MB",
    })
    .refine((file: File) => file?.name, {
      message: "File is required",
    }),
});
