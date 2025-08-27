// use server
"use server";

import { getUser, lucia } from "@/lib/auth";
import { ActionResult } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Logout(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  console.log("Logout");

  const { session } = await getUser();

  if (!session) {
    return {
      error: "You are not logged in",
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/dashboard/sign-in");
}
