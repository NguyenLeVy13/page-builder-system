"use client";

import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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

import type { Data } from "@measured/puck";

import { createTemplate } from "@/services/templateApi";
import { Template } from "@/types/template";

const FormSchema = z.object({
  title: z.string().min(1, "Please enter template title."),
});

type Props = {};

function PublishDialog(props: Props, ref: any) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const dataValue = useRef<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function formSubmit(data: z.infer<typeof FormSchema>) {
    const template: Template = {
      title: data.title,
      data: dataValue.current, // JSON stringified data
    };

    const res = await createTemplate(template);

    if (res.code === 0) {
      toast.success("Create template successfully!");
      close();

      // Redirect to template list page
      router.push("/templates");
    } else {
      toast.error(res.message);
    }
  }

  const close = useCallback(() => {
    form.reset();
    setIsOpen(false);
  }, [form])

  useImperativeHandle(
    ref,
    () => ({
      open: (data: Data) => {
        dataValue.current = JSON.stringify(data);
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
            <DialogTitle>Save template</DialogTitle>
          </DialogHeader>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template title:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter template title" {...field} />
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

export default forwardRef(PublishDialog);
