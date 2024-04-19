'use client'

import { useState, useImperativeHandle, forwardRef } from "react";
import { deleteRole } from "@/services/roleApi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  onConfirm: () => void;
};

type DeleteConfirmDialogRef = {
  open: (roleId: string) => void;
};

function DeleteConfirmDialog({ onConfirm = () => {} }: Props, ref: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [roleId, setRoleId] = useState("");

  async function handleConfirm() {
    await deleteRole(roleId);
    setIsOpen(false);
    onConfirm();
  }

  useImperativeHandle(
    ref,
    () => ({
      open: (roleId: string) => {
        setRoleId(roleId);
        setIsOpen(true)
      },
    }),
    []
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this role?</AlertDialogTitle>
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
