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

import { Menu } from "@/types/menu";
import { createMenu, updateMenu } from "@/services/menuApi";

const FormSchema = z.object({
  name: z.string().min(1, "Please enter menu name."),
  pathname: z.string().min(1, "Please enter pathname."),
});

type Props = {
  onReload: () => void;
};

export type CreateOrUpdateDialogRef = {
  open: (menu?: Menu) => void;
  close: () => void;
};

function CreateOrUpdateDialog({ onReload }: Props, ref: any) {
  const menuIdValue = useRef<string>("");

  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"create" | "update">("create");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function formSubmit(data: z.infer<typeof FormSchema>) {
    const payload: Menu = {
      name: data.name,
      pathname: data.pathname,
    };

    if (dialogType === "create") {
      const res = await createMenu(payload);
      if (res.code === 0) {
        toast.success("Create menu successfully!");
        close();
      } else {
        toast.error(res.message);
      }
    } else if (dialogType === "update") {
      if (!menuIdValue.current) {
        toast.error("Menu ID is required.");
        return;
      }

      const res = await updateMenu(menuIdValue.current, payload);
      if (res.code === 0) {
        toast.success("Update menu successfully!");
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
      open: (menu?: Menu) => {
        // If menuId is empty, it means create new menu
        setDialogType(menu?._id ? "update" : "create");
        menuIdValue.current = menu?._id || "";

        form.setValue("name", menu?.name || "");
        form.setValue("pathname", menu?.pathname || "");
        
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
              {dialogType === "create" ? "Create new menu" : "Update menu"}
            </DialogTitle>
          </DialogHeader>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu name:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter menu name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pathname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pathname:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter pathname" {...field} />
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
