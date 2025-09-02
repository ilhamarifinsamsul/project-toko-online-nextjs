// use client
"use client";

import React, { useEffect, useState } from "react";
import { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { deleteLocation } from "../lib/actions";
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
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const deleteCategoryWithId = (_: unknown, formData: FormData) =>
    deleteLocation(_, id, formData);

  const [state, formAction] = useActionState(
    deleteCategoryWithId,
    initialState
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);

      // 🔄 refresh data table
      router.refresh();

      // ⏩ redirect otomatis setelah delete
      router.push("/dashboard/categories");

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
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus data ini?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
          </DialogTrigger>

          <form action={formAction}>
            <SubmitButton />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
