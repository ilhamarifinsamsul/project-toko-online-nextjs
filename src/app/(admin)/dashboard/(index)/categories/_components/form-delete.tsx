// use client
"use client";

import React from "react";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { deleteCategory } from "../lib/actions";
import { Button } from "@/components/ui/button";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: number | undefined;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={"destructive"}
      size={"sm"}
      disabled={pending}
    >
      <Trash className="mr-2 h-4 w-4" />
      {""}
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
}

export default function FormDelete({ id }: FormDeleteProps) {
  const deleteCategoryWithId = (_: unknown, formData: FormData) =>
    deleteCategory(_, id, formData);

  const [state, formAction] = useActionState(
    deleteCategoryWithId,
    initialState
  );
  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
}
