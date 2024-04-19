"use client";

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
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

import { Role } from "@/types/role";
import { createRole, updateRole } from "@/services/roleApi";

const FormSchema = z.object({
  name: z.string().min(1, "Please enter role name."),
});

type Props = {
  onReload: () => void;
};

export type CreateOrUpdateDialogRef = {
  open: (role?: Role) => void;
  close: () => void;
};

function CreateOrUpdateDialog({ onReload }: Props, ref: any) {
  const roleIdValue = useRef<string>("");

  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"create" | "update">("create");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function formSubmit(data: z.infer<typeof FormSchema>) {
    const payload: Role = {
      name: data.name,
    };

    if (dialogType === "create") {
      const res = await createRole(payload);
      if (res.code === 0) {
        toast.success("Create role successfully!");
        close();
      } else {
        toast.error(res.message);
      }
    } else if (dialogType === "update") {
      if (!roleIdValue.current) {
        toast.error("Role ID is required.");
        return;
      }

      const res = await updateRole(roleIdValue.current, payload);
      if (res.code === 0) {
        toast.success("Update role successfully!");
        close();
      } else {
        toast.error(res.message);
      }
    }

    onReload();
  }

  const close = useCallback(() => {
    form.reset();
    setIsOpen(false);
  }, [form]);

  useImperativeHandle(
    ref,
    () => ({
      open: (role?: Role) => {
        // If roleId is empty, it means create new role
        setDialogType(role?._id ? "update" : "create");
        roleIdValue.current = role?._id || "";
        form.setValue("name", role?.name || "");
        setIsOpen(true);
      },
      close,
    }),
    [close, form]
  );

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {dialogType === "create" ? "Create new role" : "Update role"}
            </DialogTitle>
          </DialogHeader>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role name:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter role name" {...field} />
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

export default forwardRef(CreateOrUpdateDialog);
