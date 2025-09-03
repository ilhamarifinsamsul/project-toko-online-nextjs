import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="text-left">
        <Link href="/dashboard/products/create">
          <Button>
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </Link>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Manage your product</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            searchPlaceholder="Search Product..."
            data={[]}
            label="Products"
          />
        </CardContent>
      </Card>
    </div>
  );
}
