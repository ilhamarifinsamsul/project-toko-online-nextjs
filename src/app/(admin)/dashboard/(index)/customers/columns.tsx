"use client";

// export type columns
import { ColumnDef } from "@tanstack/react-table";

export type TColumn = {
  id: number;
  name: string;
  email: string;
  total_transaction: number;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    id: "No",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    id: "Name",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "Email",
    header: "Email",
    accessorKey: "email",
  },
  {
    id: "Total Transaction",
    header: "Total Transaction",
    accessorKey: "total_transaction",
  },
];
