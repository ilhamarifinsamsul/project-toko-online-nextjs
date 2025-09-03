"use client";

import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase";
import { Brand } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FormDelete from "./_components/form-delete";
// import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Brand>[] = [
  {
    id: "No",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Brand Name",
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div className="flex items-center gap-4">
          <Image
            src={getImageUrl(brand.logo, "brands")}
            alt="Product"
            width={50}
            height={50}
          ></Image>
          <span className="font-medium">{brand.name}</span>
        </div>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Link href={`/dashboard/brands/edit/${brand.id}`}>
            <Button size="sm">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>
          <FormDelete id={brand.id} />
        </div>
      );
    },
  },
];
