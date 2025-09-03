// use server
"use server";

import { schemaProduct } from "@/lib/schema";
import { uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { Product } from "@prisma/client";

export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    images: formData.getAll("images"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }
  //   uploaded images
  const uploadedImage = validate.data.images as File[];
  const fileNames = [];

  for (const image of uploadedImage) {
    const filename = await uploadFile(image, "products");
    fileNames.push(filename);
  }

  //   masukkan ke database
  try {
    await prisma.product.create({
      data: {
        name: validate.data.name,
        price: Number(validate.data.price),
        description: validate.data.description,
        stock: validate.data.stock as Product["stock"],
        brand_id: Number(validate.data.brand_id),
        category_id: Number(validate.data.category_id),
        location_id: Number(validate.data.location_id),
        image: fileNames,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create product",
    };
  }

  return redirect("/dashboard/products");
}
