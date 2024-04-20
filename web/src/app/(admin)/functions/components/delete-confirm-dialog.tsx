"use client";

import { useState, useImperativeHandle, forwardRef } from "react";
import { deleteFunction } from "@/services/functionApi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Props = {
  onReload: () => void;
};

type DeleteConfirmDialogRef = {
  open: (funcId: string) => void;
};

function DeleteConfirmDialog({ onReload = () => {} }: Props, ref: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [funcId, setFuncId] = useState("");

  async function handleConfirm() {
    const res = await deleteFunction(funcId);
    if (res.code === 0) {
      toast.success("Delete function successfully");
      setIsOpen(false);
      onReload();
    } else {
      toast.error(res.message);
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      open: (funcId: string) => {
        setFuncId(funcId);
        setIsOpen(true);
      },
    }),
    []
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete this function?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export type { DeleteConfirmDialogRef };
export default forwardRef(DeleteConfirmDialog);
