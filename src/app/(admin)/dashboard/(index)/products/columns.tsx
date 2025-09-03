"use client";

import { StockProduct } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import { convertDate, rupiah } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
// import FormDelete from "./_components/form-delete";

export type TColumn = {
  id: number;
  name: string;
  image_url: string;
  category_name: string;
  brand_name: string;
  price: number;
  total_sales: number;
  stock: StockProduct;
  createdAt: Date;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    id: "No",
    header: "No",
    accessorKey: "id",
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-4">
          <Image
            src={getImageUrl(product.image_url, "brands")}
            alt="Product"
            width={50}
            height={50}
          ></Image>
          <span className="font-medium">{product.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;
      return rupiah(product.price);
    },
  },
  {
    accessorKey: "stock",
    header: "Status",
    cell: ({ row }) => {
      const product = row.original;
      return <Badge variant="outline">{product.stock}</Badge>;
    },
  },
  {
    accessorKey: "total_sales",
    header: "Total Sales",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const product = row.original;
      return convertDate(product.createdAt);
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Link href={`/dashboard/products/edit/${product.id}`}>
            <Button size="sm">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>
          {/* <FormDelete id={product.id} /> */}
        </div>
      );
    },
  },
];
