"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
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

import type { Data } from "@measured/puck";

import { createTemplate } from "@/services/templateApi";
import { Template } from "@/types/template";

const FormSchema = z.object({
  title: z.string().min(1, "Please enter template title."),
});

type Props = {};

function PublishDialog(props: Props, ref: any) {
  const [isOpen, setIsOpen] = useState(false);
  const dataValue = useRef<string>("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  function formSubmit(data: z.infer<typeof FormSchema>) {
    const template: Template = {
      title: data.title,
      data: dataValue.current, // JSON stringified data
    };

    console.log(template);

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  useImperativeHandle(
    ref,
    () => ({
      open: (data: Data) => {
        dataValue.current = JSON.stringify(data);
        setIsOpen(true);
      },
      close: () => {
        setIsOpen(false);
      },
    }),
    []
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
