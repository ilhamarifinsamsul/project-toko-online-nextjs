import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getCustomers } from "./lib/data";
// import { getOrders } from "./lib/data";

export default async function Page() {
  const data = await getCustomers();
  return (
    <div className="space-y-4">
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>Manage your customer</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            searchPlaceholder="Search Customer..."
            data={data}
            label="Customers"
          />
        </CardContent>
      </Card>
    </div>
  );
}
