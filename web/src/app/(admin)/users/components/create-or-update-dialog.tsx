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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { User } from "@/types/user";
import { register } from "@/services/userApi";
import { Role } from "@/types/role";

const FormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Please enter user email."),
  password: z.string().min(5, "Password must be at least 5 characters."),
  fullName: z.string().min(1, "Please enter user full name."),
  roleId: z.string({
    required_error: "Please select a role.",
  }),
});

type Props = {
  roleList: Role[];
  onReload: () => void;
};

export type CreateOrUpdateDialogRef = {
  open: (user?: User) => void;
  close: () => void;
};

function CreateOrUpdateDialog(
  { roleList = [], onReload = () => {} }: Props,
  ref: any
) {
  const userIdValue = useRef<string>("");

  const [isOpen, setIsOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"create" | "update">("create");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      roleId: "",
    },
  });

  async function formSubmit(data: z.infer<typeof FormSchema>) {
    const payload: User = {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      roleId: data.roleId,
    };

    if (dialogType === "create") {
      const res = await register(payload);
      if (res.code === 0) {
        toast.success("Register new user successfully!");
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
      open: (user?: User) => {
        // If userId is empty, it means create new user
        setDialogType(user?._id ? "update" : "create");
        userIdValue.current = user?._id || "";
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
            <DialogTitle>
              {dialogType === "create" ? "Register new user" : "Update user"}
            </DialogTitle>
          </DialogHeader>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name:</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roleList.map((role) => (
                      <SelectItem key={role._id} value={role._id!}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
