'use client'

import { useState, useImperativeHandle, forwardRef } from "react";
import { deleteUser } from "@/services/userApi";

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
  open: (userId: string) => void;
};

function DeleteConfirmDialog({ onReload = () => {} }: Props, ref: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");

  async function handleConfirm() {
    const res = await deleteUser(userId);
    if (res.code === 0) {
      toast.success("Delete user successfully");
      setIsOpen(false);
      onReload();
    } else {
      toast.error(res.message);
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      open: (userId: string) => {
        setUserId(userId);
        setIsOpen(true)
      },
    }),
    []
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this user?</AlertDialogTitle>
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
