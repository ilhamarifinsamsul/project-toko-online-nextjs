// use server
"use server";

import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { Product } from "@prisma/client";
import { deleteFile } from "@/lib/supabase";

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
        price: Number.parseInt(validate.data.price),
        description: validate.data.description,
        stock: validate.data.stock as Product["stock"],
        brand_id: Number.parseInt(validate.data.brand_id),
        category_id: Number.parseInt(validate.data.category_id),
        location_id: Number.parseInt(validate.data.location_id),
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

// Fungsi update product
export async function updateProduct(
  _: unknown,
  id: number | undefined,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaProductEdit.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    stock: formData.get("stock"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    id: id,
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  //   ambil data product in database
  const product = await prisma.product.findFirst({
    where: { id },
  });

  if (!product) {
    return {
      error: "Product not found",
    };
  }

  const uploadedImage = formData.getAll("images") as File[];
  let fileNames = [];

  if (uploadedImage.length === 3) {
    const parseImages = schemaProduct
      .pick({
        images: true,
      })
      .safeParse({
        images: uploadedImage,
      });

    if (!parseImages.success) {
      return {
        error: parseImages.error.issues[0].message,
      };
    }

    for (const image of uploadedImage) {
      const filename = await uploadFile(image, "products");
      fileNames.push(filename);
    }
  } else {
    fileNames = product.image;
  }

  //   try catch
  try {
    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
        price: Number.parseInt(validate.data.price),
        description: validate.data.description,
        stock: validate.data.stock as Product["stock"],
        brand_id: Number.parseInt(validate.data.brand_id),
        category_id: Number.parseInt(validate.data.category_id),
        location_id: Number.parseInt(validate.data.location_id),
        image: fileNames,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update product",
    };
  }

  return redirect("/dashboard/products");
}

export async function deleteProduct(
  _: unknown,
  id: number | undefined,
  formData: FormData
): Promise<ActionResult> {
  if (!id === undefined) {
    return {
      error: "Product not found",
      success: "",
    };
  }

  const product = await prisma.product.findFirst({
    where: { id },
    select: { id: true, image: true },
  });

  if (!product) {
    return {
      error: "Product not found",
      success: "",
    };
  }

  // delete image yang ada di supabase
  for (const image of product.image) {
    deleteFile(image, "products");
  }

  try {
    await prisma.product.delete({
      where: { id },
    });
    return {
      error: "",
      success: "Deleted Product successfully ✅",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete product",
      success: "",
    };
  }
}
