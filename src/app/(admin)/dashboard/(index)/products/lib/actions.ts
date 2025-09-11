// // use server
// "use server";

// import { schemaProduct, schemaProductEdit } from "@/lib/schema";
// import { uploadFile } from "@/lib/supabase";
// import { ActionResult } from "@/types";
// import prisma from "../../../../../../../lib/prisma";
// import { Product } from "@prisma/client";
// import { deleteFile } from "@/lib/supabase";

// export async function storeProduct(
//   _: unknown,
//   formData: FormData
// ): Promise<ActionResult> {
//   const validate = schemaProduct.safeParse({
//     name: formData.get("name"),
//     price: formData.get("price"),
//     description: formData.get("description"),
//     stock: formData.get("stock"),
//     brand_id: formData.get("brand_id"),
//     category_id: formData.get("category_id"),
//     location_id: formData.get("location_id"),
//     images: formData.getAll("images"),
//   });

//   if (!validate.success) {
//     return {
//       error: validate.error.issues[0].message,
//     };
//   }
//   //   uploaded images
//   const uploadedImage = validate.data.images as File[];
//   const fileNames = [];

//   for (const image of uploadedImage) {
//     const filename = await uploadFile(image, "products");
//     fileNames.push(filename);
//   }

//   //   masukkan ke database
//   try {
//     await prisma.product.create({
//       data: {
//         name: validate.data.name,
//         price: Number.parseInt(validate.data.price),
//         description: validate.data.description,
//         stock: validate.data.stock as Product["stock"],
//         brand_id: Number.parseInt(validate.data.brand_id),
//         category_id: Number.parseInt(validate.data.category_id),
//         location_id: Number.parseInt(validate.data.location_id),
//         image: fileNames,
//       },
//     });

//     return {
//       error: "",
//       success: "Created Product successfully ✅",
//     };
//   } catch (error) {
//     console.error("storeProduct error:", error);
//     return {
//       error: "Failed to create product",
//     };
//   }
// }

// // Fungsi update product
// export async function updateProduct(
//   _: unknown,
//   id: number | undefined,
//   formData: FormData
// ): Promise<ActionResult> {
//   const validate = schemaProductEdit.safeParse({
//     name: formData.get("name"),
//     price: formData.get("price"),
//     description: formData.get("description"),
//     stock: formData.get("stock"),
//     brand_id: formData.get("brand_id"),
//     category_id: formData.get("category_id"),
//     location_id: formData.get("location_id"),
//     id: id,
//   });

//   if (!validate.success) {
//     return {
//       error: validate.error.issues[0].message,
//     };
//   }

//   //   ambil data product in database
//   const product = await prisma.product.findFirst({
//     where: { id },
//   });

//   if (!product) {
//     return {
//       error: "Product not found",
//     };
//   }

//   const uploadedImage = formData.getAll("images") as File[];
//   let fileNames = [];

//   if (uploadedImage.length === 3) {
//     const parseImages = schemaProduct
//       .pick({
//         images: true,
//       })
//       .safeParse({
//         images: uploadedImage,
//       });

//     if (!parseImages.success) {
//       return {
//         error: parseImages.error.issues[0].message,
//       };
//     }

//     for (const image of uploadedImage) {
//       const filename = await uploadFile(image, "products");
//       fileNames.push(filename);
//     }
//   } else {
//     fileNames = product.image;
//   }

//   //   try catch
//   try {
//     await prisma.product.update({
//       where: {
//         id: id,
//       },
//       data: {
//         name: validate.data.name,
//         price: Number.parseInt(validate.data.price),
//         description: validate.data.description,
//         stock: validate.data.stock as Product["stock"],
//         brand_id: Number.parseInt(validate.data.brand_id),
//         category_id: Number.parseInt(validate.data.category_id),
//         location_id: Number.parseInt(validate.data.location_id),
//         image: fileNames,
//       },
//     });

//     return {
//       error: "",
//       success: "Updated Product successfully ✅",
//     };
//   } catch (error) {
//     console.error("updateProduct error:", error);
//     return {
//       error: "Failed to update product",
//     };
//   }
// }

// export async function deleteProduct(
//   _: unknown,
//   id: number | undefined,
//   formData: FormData
// ): Promise<ActionResult> {
//   if (!id === undefined) {
//     return {
//       error: "Product not found",
//       success: "",
//     };
//   }

//   const product = await prisma.product.findFirst({
//     where: { id },
//     select: { id: true, image: true },
//   });

//   if (!product) {
//     return {
//       error: "Product not found",
//       success: "",
//     };
//   }

//   // delete image yang ada di supabase
//   for (const image of product.image) {
//     deleteFile(image, "products");
//   }

//   try {
//     await prisma.product.delete({
//       where: { id },
//     });
//     return {
//       error: "",
//       success: "Deleted Product successfully ✅",
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       error: "Failed to delete product",
//       success: "",
//     };
//   }
// }

// use server
"use server";

import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { uploadFile, deleteFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import prisma from "../../../../../../../lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  try {
    // Validasi form data
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
      console.error("Validation error:", validate.error.issues);
      return {
        error: validate.error.issues[0].message,
        success: "",
      };
    }

    // Validasi field yang required
    if (!validate.data.brand_id || validate.data.brand_id === "default") {
      return {
        error: "Please select a brand",
        success: "",
      };
    }

    if (!validate.data.category_id || validate.data.category_id === "default") {
      return {
        error: "Please select a category",
        success: "",
      };
    }

    if (!validate.data.location_id || validate.data.location_id === "default") {
      return {
        error: "Please select a location",
        success: "",
      };
    }

    // Upload images
    const uploadedImages = validate.data.images as File[];
    const fileNames = [];

    if (uploadedImages && uploadedImages.length > 0) {
      for (const image of uploadedImages) {
        if (image.size > 0) {
          // Check if file is not empty
          try {
            const filename = await uploadFile(image, "products");
            if (filename) {
              fileNames.push(filename);
            }
          } catch (uploadError) {
            console.error("Upload error:", uploadError);
            return {
              error: "Failed to upload image",
              success: "",
            };
          }
        }
      }
    }

    // Create product in database
    const newProduct = await prisma.product.create({
      data: {
        name: validate.data.name,
        price: Number(validate.data.price),
        description: validate.data.description || "",
        stock: validate.data.stock as Product["stock"],
        brand_id: Number(validate.data.brand_id),
        category_id: Number(validate.data.category_id),
        location_id: Number(validate.data.location_id),
        image: fileNames,
      },
    });

    // Revalidate the products page
    revalidatePath("/dashboard/products");

    return {
      error: "",
      success: "Product created successfully ✅",
    };
  } catch (error) {
    console.error("storeProduct error:", error);
    return {
      error: "Failed to create product",
      success: "",
    };
  }
}

export async function updateProduct(
  _: unknown,
  id: number | undefined,
  formData: FormData
): Promise<ActionResult> {
  try {
    if (!id) {
      return {
        error: "Product ID is required",
        success: "",
      };
    }

    // Validate form data
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
      console.error("Validation error:", validate.error.issues);
      return {
        error: validate.error.issues[0].message,
        success: "",
      };
    }

    // Get existing product
    const product = await prisma.product.findFirst({
      where: { id },
    });

    if (!product) {
      return {
        error: "Product not found",
        success: "",
      };
    }

    // Handle image upload
    const uploadedImages = formData.getAll("images") as File[];
    let fileNames = product.image; // Keep existing images by default

    if (uploadedImages && uploadedImages.length > 0) {
      const validImages = uploadedImages.filter((img) => img.size > 0);

      if (validImages.length > 0) {
        const parseImages = schemaProduct
          .pick({
            images: true,
          })
          .safeParse({
            images: validImages,
          });

        if (!parseImages.success) {
          return {
            error: parseImages.error.issues[0].message,
            success: "",
          };
        }

        // Delete old images first
        for (const oldImage of product.image) {
          try {
            await deleteFile(oldImage, "products");
          } catch (error) {
            console.warn("Failed to delete old image:", oldImage);
          }
        }

        // Upload new images
        fileNames = [];
        for (const image of validImages) {
          try {
            const filename = await uploadFile(image, "products");
            if (filename) {
              fileNames.push(filename);
            }
          } catch (uploadError) {
            console.error("Upload error:", uploadError);
            return {
              error: "Failed to upload image",
              success: "",
            };
          }
        }
      }
    }

    // Update product in database
    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: validate.data.name,
        price: Number(validate.data.price),
        description: validate.data.description || "",
        stock: validate.data.stock as Product["stock"],
        brand_id: Number(validate.data.brand_id),
        category_id: Number(validate.data.category_id),
        location_id: Number(validate.data.location_id),
        image: fileNames,
      },
    });

    // Revalidate the products page
    revalidatePath("/dashboard/products");

    return {
      error: "",
      success: "Product updated successfully ✅",
    };
  } catch (error) {
    console.error("updateProduct error:", error);
    return {
      error: "Failed to update product",
      success: "",
    };
  }
}

export async function deleteProduct(
  _: unknown,
  id: number | undefined,
  formData: FormData
): Promise<ActionResult> {
  try {
    if (!id) {
      return {
        error: "Product ID is required",
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

    // Delete images from storage
    for (const image of product.image) {
      try {
        await deleteFile(image, "products");
      } catch (error) {
        console.warn("Failed to delete image:", image);
      }
    }

    // Delete product from database
    await prisma.product.delete({
      where: { id },
    });

    // Revalidate the products page
    revalidatePath("/dashboard/products");

    return {
      error: "",
      success: "Product deleted successfully ✅",
    };
  } catch (error) {
    console.error("deleteProduct error:", error);
    return {
      error: "Failed to delete product",
      success: "",
    };
  }
}
