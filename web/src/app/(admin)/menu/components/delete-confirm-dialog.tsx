'use client'

import { useState, useImperativeHandle, forwardRef } from "react";
import { deleteMenu } from "@/services/menuApi";

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
  open: (menuId: string) => void;
};

function DeleteConfirmDialog({ onReload = () => {} }: Props, ref: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuId, setMenuId] = useState("");

  async function handleConfirm() {
    const res = await deleteMenu(menuId);
    if (res.code !== 0) {
      toast.success("Delete role successfully");
      setIsOpen(false);
      onReload();
    } else {
      toast.error(res.message);
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      open: (menuId: string) => {
        setMenuId(menuId);
        setIsOpen(true)
      },
    }),
    []
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this menu?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export type { DeleteConfirmDialogRef }
export default forwardRef(DeleteConfirmDialog);
