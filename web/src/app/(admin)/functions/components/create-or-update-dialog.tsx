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

import { FuncType } from "@/types/function";
import { createFunction, updateFunction } from "@/services/functionApi";

const FormSchema = z.object({
  name: z.string().min(1, "Please enter function name."),
  key: z.string().min(1, "Please enter function key."),
});

type Props = {
  onReload: () => void;
};

export type CreateOrUpdateDialogRef = {
  open: (funcType?: FuncType) => void;
  close: () => void;
};

function CreateOrUpdateDialog({ onReload }: Props, ref: any) {
  const functionIdValue = useRef<string>("");

  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"create" | "update">("create");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function formSubmit(data: z.infer<typeof FormSchema>) {
    const payload: FuncType = {
      name: data.name,
      key: data.key,
    };

    if (dialogType === "create") {
      const res = await createFunction(payload);
      if (res.code === 0) {
        toast.success("Create function successfully!");
        close();
      } else {
        toast.error(res.message);
      }
    } else if (dialogType === "update") {
      if (!functionIdValue.current) {
        toast.error("Function ID is required.");
        return;
      }

      const res = await updateFunction(functionIdValue.current, payload);
      if (res.code === 0) {
        toast.success("Update function successfully!");
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
      open: (funcType?: FuncType) => {
        // If functionId is empty, it means create new function
        setDialogType(funcType?._id ? "update" : "create");
        functionIdValue.current = funcType?._id || "";

        form.setValue("name", funcType?.name || "");
        form.setValue("key", funcType?.key || "");
        
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
              {dialogType === "create" ? "Create new function" : "Update function"}
            </DialogTitle>
          </DialogHeader>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Function name:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter function name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Function key:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter function key" {...field} />
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
