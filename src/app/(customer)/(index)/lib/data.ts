import { getImageUrl } from "@/lib/supabase";
import prisma from "../../../../../lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProducts() {
  try {
    const product = await prisma.product.findMany({
      select: {
        image: true,
        id: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        },
        price: true,
      },
    });
    // mapping data
    const response = product.map((item) => {
      return {
        ...item,
        image_url: getImageUrl(item.image[0], "products"),
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMostPickedProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 5,
      orderBy: {
        orders: { _count: "desc" }, // urutkan paling banyak dibeli
      },
      include: {
        category: { select: { name: true } },
        _count: { select: { orders: true } },
      },
    });

    return products.map((item) => ({
      ...item,
      ordersCount: item._count.orders,
      image_url: getImageUrl(item.image[0], "products"),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getNewReleaseProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 10,
      orderBy: { createdAt: "desc" }, // urutkan terbaru
      include: {
        category: { select: { name: true } },
      },
    });

    return products.map((item) => ({
      ...item,
      image_url: getImageUrl(item.image[0], "products"),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
