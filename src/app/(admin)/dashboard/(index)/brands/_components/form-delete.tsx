// use client
"use client";

import React, { useEffect, useState } from "react";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { deleteBrand } from "../lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // ⬅️ tambah ini

const initialState: ActionResult = {
  error: "",
  success: "",
};

interface FormDeleteProps {
  id: number | undefined;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size={"sm"}
      disabled={pending}
      variant={"destructive"}
    >
      <Trash className="mr-2 h-4 w-4" />
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
}

export default function FormDelete({ id }: FormDeleteProps) {
  const router = useRouter(); // ⬅️ inisialisasi router

  const deleteBrandWithId = (_: unknown, formData: FormData) =>
    deleteBrand(_, id, formData);

  const [state, formAction] = useActionState(deleteBrandWithId, initialState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);

      // revalidate data table tanpa reload full page
      router.refresh();

      setOpen(false);
    }

    if (state.error) {
      toast.error(state.error);
    }
  }, [state.success, state.error, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash className="mr-2 h-4 w-4" /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Brand</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this brand?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
          </DialogTrigger>

          <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
