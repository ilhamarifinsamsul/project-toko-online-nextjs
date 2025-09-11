"use server";

import { redirect } from "next/navigation";
import { ActionResult } from "@/types";
import { schemaSignUp, SignInSchema } from "@/lib/schema";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt"; // atau "bcryptjs" kalau mau lebih portable
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function SignIn(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  // Validasi input pakai Zod
  const validate = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  // Cari user di database
  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "customer", // kalau memang mau dibatasi ke superadmin
    },
  });

  if (!existingUser) {
    return {
      error: "Invalid email or password",
    };
  }

  // Bandingkan password (❗ pakai await)
  const isPasswordValid = await bcrypt.compare(
    validate.data.password,
    existingUser.password
  );

  if (!isPasswordValid) {
    return {
      error: "Invalid email or password",
    };
  }

  // Buat session pakai Lucia
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // Redirect kalau sukses
  return redirect("/");
}

// fungsi untuk sign-up
export async function SignUp(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  // melakukan validasi
  const validate = schemaSignUp.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  // hash password
  const hashedPassword = await bcrypt.hashSync(validate.data.password, 12);

  // buat user di database
  try {
    await prisma.user.create({
      data: {
        name: validate.data.name,
        email: validate.data.email,
        password: hashedPassword,
        role: "customer",
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create user",
    };
  }

  return redirect(
    "/sign-in?success=Account created successfully, please login"
  );
}
