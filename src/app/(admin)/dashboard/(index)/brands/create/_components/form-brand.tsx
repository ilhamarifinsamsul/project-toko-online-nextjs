"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Brand } from "@prisma/client";
import { useActionState } from "react";
import { postBrand, updateBrand } from "../../lib/actions";
import { ActionResult } from "@/types";

const initialState: ActionResult = {
  error: "",
  success: "",
};

interface PropsBrandForm {
  type?: "ADD" | "EDIT";
  data?: Brand | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size={"sm"} disabled={pending}>
      {pending ? "Saving..." : "Save Brand"}
    </Button>
  );
}

export default function FormBrand({
  type = "ADD",
  data = null,
}: PropsBrandForm) {
  const router = useRouter();
  const updateBrandWithId = async (_: unknown, formData: FormData) => {
    const result = await updateBrand(_, formData, data?.id);
    // kalau sukses tanpa error → redirect manual
    if (!result.error) {
      router.push("/dashboard/brands");
      router.refresh();
    }
    return result;
  };

  const [state, formAction] = useActionState(
    type === "ADD" ? postBrand : updateBrandWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/brands">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Brand
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <SubmitButton />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0" className="w-[500px]">
                <CardHeader>
                  <CardTitle>Brand Details</CardTitle>
                  <CardDescription>Input the brand name</CardDescription>
                </CardHeader>
                <CardContent>
                  {state.error !== "" && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        defaultValue={data?.name}
                        type="text"
                        placeholder="Brand name"
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="logo">Logo</Label>
                      <Input
                        id="logo"
                        name="image"
                        // defaultValue={data?.logo}
                        type="file"
                        // placeholder="Category name"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Brand</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
