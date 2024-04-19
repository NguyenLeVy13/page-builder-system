"use client";

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { updatePasswordById } from "@/services/userApi";
import { getUserInfoCookie } from "@/auth/user";

const FormSchema = z.object({
  password: z.string().min(1, "Please enter new password."),
});

type Props = {};

type ChangePasswordDialogRef = {
  open: () => void;
};

function ChangePasswordDialog(props: Props, ref: any) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  async function formSubmit(data: z.infer<typeof FormSchema>) {
    const userInfoCookie = getUserInfoCookie();

    const res = await updatePasswordById(userInfoCookie.id, {
      newPassword: data.password,
    });
    if (res.code === 0) {
      toast.success("Update password successfully!");
      close();
    } else {
      toast.error(res.message);
    }
  }

  const close = useCallback(() => {
    form.reset();
    setIsOpen(false);
  }, [form]);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setIsOpen(true);
      },
      close,
    }),
    [close]
  );

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update password</DialogTitle>
          </DialogHeader>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button onClick={form.handleSubmit(formSubmit)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

export type { ChangePasswordDialogRef }
export default forwardRef(ChangePasswordDialog);
