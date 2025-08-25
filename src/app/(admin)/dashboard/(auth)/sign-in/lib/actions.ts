// use server
"use server";

import { console } from "inspector";
import { redirect } from "next/navigation";
import { ActionResult } from "@/types";

export default async function SignIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  console.log("Sign-in attempt:", formData.get("email"));
  // Perform sign-in logic here

  return redirect("/dashboard/sign-in");
}
