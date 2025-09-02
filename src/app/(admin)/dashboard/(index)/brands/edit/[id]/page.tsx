import { Tedit } from "@/types";
import React from "react";
import FormBrand from "../../_components/form-brand";
import { getBrandById } from "../../lib/data";
import { redirect } from "next/navigation";

export default async function EditPage({ params }: Tedit) {
  const data = await getBrandById(params.id);

  if (!data) {
    return redirect("/dashboard/brands");
  }
  console.log(params.id);

  return <FormBrand data={data} type="EDIT" />;
}
