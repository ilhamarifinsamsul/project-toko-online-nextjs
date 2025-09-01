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
import { columns } from "./column";
import { getBrands } from "./lib/data";
// import { data } from "./data";

export default async function Page() {
  const data = await getBrands();
  return (
    <div className="space-y-4">
      <div className="text-left">
        <Link href="/dashboard/brands/create">
          <Button>
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Brand
            </span>
          </Button>
        </Link>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Brands</CardTitle>
          <CardDescription>Manage your brand</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            // data={data}
            searchPlaceholder="Search Brand..."
            data={data}
            label="Brands"
          />
        </CardContent>
      </Card>
    </div>
  );
}
