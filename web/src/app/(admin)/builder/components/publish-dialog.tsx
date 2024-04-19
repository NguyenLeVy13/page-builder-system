"use client";

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
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

import { createTemplate, updateTemplate } from "@/services/templateApi";
import { Template } from "@/types/template";

const FormSchema = z.object({
  title: z.string().min(1, "Please enter template title."),
});

type Props = {
  type: string;
};

function PublishDialog({ type = "create" }: Props, ref: any) {
  const router = useRouter();

  const templateIdValue = useRef<string>("");
  const dataValue = useRef<any>("");

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function formSubmit(data: z.infer<typeof FormSchema>) {
    // Update title in data
    if (dataValue.current?.root?.props?.title) {
      dataValue.current.root.props.title = data.title;
    }

    const payload: Template = {
      title: data.title,
      data: JSON.stringify(dataValue.current),
    };

    if (type === "create") {
      const res = await createTemplate(payload);
      if (res.code === 0) {
        toast.success("Create template successfully!");
        close();

        // Redirect to template list page
        router.push("/templates");
      } else {
        toast.error(res.message);
      }
    } else if (type === "update") {
      if (!templateIdValue.current) {
        toast.error("Template ID is required.");
        return;
      }

      const res = await updateTemplate(templateIdValue.current, payload);
      if (res.code === 0) {
        toast.success("Update template successfully!");
        close();
      } else {
        toast.error(res.message);
      }
    }
  }

  const close = useCallback(() => {
    form.reset();
    setIsOpen(false);
  }, [form]);

  useImperativeHandle(
    ref,
    () => ({
      open: (data: Data, template?: Template) => {
        dataValue.current = data;
        templateIdValue.current = template?._id || "";
        form.setValue("title", template?.title || "");
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
