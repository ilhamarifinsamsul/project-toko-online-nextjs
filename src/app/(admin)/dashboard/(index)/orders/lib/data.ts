// Ambil Data Order for Customer

import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";
import { getImageUrl } from "@/lib/supabase";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        products: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // maping data
    const response: TColumn[] = orders.map((order) => {
      return {
        id: order.id,
        product: order.products.map((item) => {
          return {
            name: item.product.name, // maping product.
            image: getImageUrl(item.product.image[0]), // maping product.image,
          };
        }),
        customer_name: order.user.name,
        price: Number(order.total),
        status: order.status,
      };
    });

    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}
