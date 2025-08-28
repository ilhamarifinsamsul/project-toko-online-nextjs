"use client";

import { Button } from "@/components/ui/button";
import { Location } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/form-delete";

export const columns: ColumnDef<Location>[] = [
  {
    id: "No",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Location Name",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const location = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Link href={`/dashboard/locations/edit/${location.id}`}>
            <Button size="sm">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>
          <FormDelete id={location.id} />
        </div>
      );
    },
  },
];
