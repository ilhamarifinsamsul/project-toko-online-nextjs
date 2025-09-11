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

export const schemaSignUp = SignInSchema.extend({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
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

export const schemaProduct = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: z
    .string({ message: "Description is required" })
    .min(10, { message: "Description must be at least 3 characters long" }),
  price: z.string({ message: "Price is required" }),
  stock: z.string({ message: "Stock is required" }),
  brand_id: z.string({ message: "Brand is required" }),
  category_id: z.string({ message: "Category is required" }),
  location_id: z.string({ message: "Location is required" }),
  images: z
    .any()
    .refine((files: File[]) => files.length >= 3, {
      message: "At least 3 images are required",
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          validate = ALLOW_MIME_TYPES.includes(file.type);
        });
        return validate;
      },
      {
        message: "Invalid file type",
      }
    ),
});

// schema edit product
export const schemaProductEdit = schemaProduct
  .extend({
    id: z.number({ message: "ProductId is required" }),
  })
  .omit({ images: true });
