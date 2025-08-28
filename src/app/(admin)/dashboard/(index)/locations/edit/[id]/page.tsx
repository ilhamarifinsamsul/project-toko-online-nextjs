import React from "react";
import { getLocationById } from "../../lib/data";
import { redirect } from "next/navigation";
import FormLocation from "../../_components/form-location";

type Tparams = {
  id: string;
};

interface EditPageProps {
  params: Tparams;
}

export default async function EditPage({ params }: EditPageProps) {
  const data = await getLocationById(params.id);

  if (!data) {
    return redirect("/dashboard/locations");
  }
  console.log(data);
  return <FormLocation data={data} type="EDIT" />;
}
