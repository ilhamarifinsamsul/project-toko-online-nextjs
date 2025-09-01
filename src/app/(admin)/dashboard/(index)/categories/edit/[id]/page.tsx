import React from "react";
import { getCategoryById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormCategory from "../../_components/form-category";
import { Tedit } from "@/types";

export default async function EditPage({ params }: Tedit) {
  const data = await getCategoryById(params.id);

  if (!data) {
    return redirect("/dashboard/categories");
  }
  console.log(data);
  return <FormCategory data={data} type="EDIT" />;
}
