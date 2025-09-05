// Fungsi mengambil data customers dari database

import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";

export async function getCustomers() {
  try {
    const customers = await prisma.user.findMany({
      where: {
        role: "customer",
      },
      orderBy: {
        id: "asc",
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });
    // mapping data
    const response: TColumn[] = customers.map((customer) => {
      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        total_transaction: customer._count.orders,
      };
    });
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
}
