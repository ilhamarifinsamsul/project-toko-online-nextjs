"use server";

import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { schemaBrand } from "@/lib/schema";
import { uploadFile } from "@/lib/supabase";

export async function postBrand(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaBrand.safeParse({
    name: formData.get("name"),
    image: formData.get("image"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    const fileName = await uploadFile(validate.data.image, "brands");

    await prisma.brand.create({
      data: {
        name: validate.data.name,
        logo: fileName,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create brand",
    };
  }

  return redirect("/dashboard/brands");
}

export async function updateBrand(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const fileUpload = formData.get("image");
  const validate = schemaBrand.pick({ name: true }).safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  const brand = await prisma.brand.findFirst({
    where: {
      id: id,
    },
    select: {
      logo: true,
    },
  });

  let fileName = brand?.logo;

  // ✅ cek apakah fileUpload adalah File
  if (fileUpload instanceof File && fileUpload.size > 0) {
    fileName = await uploadFile(fileUpload, "brands");
  }

  try {
    await prisma.brand.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
        logo: fileName || undefined,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update brand",
    };
  }

  return redirect("/dashboard/brands");
}

export async function deleteBrand(
  _: unknown,
  id: number | undefined,
  formData: FormData
): Promise<ActionResult> {
  if (!id === undefined) {
    return {
      error: "Brand not found",
      success: "",
    };
  }

  try {
    await prisma.brand.delete({
      where: { id },
    });

    return {
      error: "",
      success: "Brand deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to delete brand",
      success: "",
    };
  }
}
