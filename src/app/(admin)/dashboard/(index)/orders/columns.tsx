// use client
"use client";

import { StatusOrder } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { rupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type TProduct = {
  name: string;
  image: string;
};

export type TColumn = {
  id: number;
  product: TProduct[];
  customer_name: string;
  price: number;
  status: StatusOrder;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    id: "No",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    header: "Products",
    accessorKey: "product",
    cell: ({ row }) => {
      const order = row.original;
      // pastikan order.product itu array
      if (!Array.isArray(order.product)) {
        return null;
      }

      return (
        <div className="flex gap-4 flex-col justify-start">
          {order.product.map((item, index) => (
            <div
              className="flex items-center gap-4"
              key={`${item.name}-${index}`}
            >
              <Image
                src={item.image ? getImageUrl(item.image) : ""}
                alt="Product"
                width={80}
                height={80}
              ></Image>
              <span className="font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    header: "Customer",
    accessorKey: "customer_name",
  },
  {
    header: "Total Price",
    accessorKey: "price",
    // format rupiah
    cell: ({ row }) => rupiah(row.original.price),
  },
  {
    header: "Status Order",
    accessorKey: "status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={row.original.status === "failed" ? "destructive" : "default"}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
];

export default function Columns() {
  return <div>Column</div>;
}
