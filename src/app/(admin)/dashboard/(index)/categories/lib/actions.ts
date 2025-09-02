"use server";

import prisma from "../../../../../../../lib/prisma";
import { redirect } from "next/navigation";
import { ActionResult } from "@/types";
import { schemaCategory } from "@/lib/schema";

export async function postCategory(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    await prisma.category.create({
      data: {
        name: validate.data.name,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create category",
    };
  } finally {
    return redirect("/dashboard/categories");
  }
}

export async function updateCategory(
  _: unknown,
  formData: FormData,
  id: number | undefined
): Promise<ActionResult> {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  if (!id === undefined) {
    return {
      error: "Category not found",
    };
  }

  try {
    await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
      },
    });
    return {
      error: "",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update category",
    };
  }
}

export async function deleteCategory(
  _: unknown,
  id: number | undefined,
  formData: FormData
): Promise<ActionResult> {
  if (!id === undefined) {
    return {
      error: "Category not found",
    };
  }

  try {
    await prisma.category.delete({
      where: { id },
    });

    return {
      error: "",
      success: "Category deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete category",
    };
  }
}
