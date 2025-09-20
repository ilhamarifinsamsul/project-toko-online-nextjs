import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        _count: {
          select: {
            orders: true,
          },
        },
        name: true,
        createdAt: true,
        price: true,
        stock: true,
        category: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
        image: true,
      },
    });

    const responProduct: TColumn[] = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        image_url: Array.isArray(product.image)
          ? product.image[0] ?? ""
          : product.image ?? "",
        category_name: product.category.name,
        brand_name: product.brand.name,
        price: Number(product.price),
        total_sales: product._count.orders,
        stock: product.stock,
        createdAt: product.createdAt,
      };
    });

    return responProduct;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}
