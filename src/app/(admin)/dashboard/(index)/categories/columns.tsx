"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Category>[] = [
  {
    id: "No",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Link href={`/dashboard/categories/edit/${category.id}`}>
            <Button size="sm">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>
          <FormDelete id={category.id} />
        </div>
      );
    },
  },
];
