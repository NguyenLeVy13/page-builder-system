'use client'

import { useState, useImperativeHandle, forwardRef } from "react";
import { deleteTemplate } from "@/services/templateApi";

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
  onConfirm: () => void;
};

type DeleteConfirmDialogRef = {
  open: (templateId: string) => void;
};

function DeleteConfirmDialog({ onConfirm = () => {} }: Props, ref: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [templateId, setTemplateId] = useState("");

  async function handleConfirm() {
    const res = await deleteTemplate(templateId);
    if (res.code === 0) {
      toast.success("Delete template successfully");
      setIsOpen(false);
      onConfirm();
    } else {
      toast.error(res.message);
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      open: (templateId: string) => {
        setTemplateId(templateId);
        setIsOpen(true)
      },
    }),
    []
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete this template?</AlertDialogTitle>
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
