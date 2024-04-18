"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { login } from "@/services/userApi";

const FormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Please enter your email."),
  password: z.string().min(5, "Password must be at least 5 characters."),
});

function LoginForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function formSubmit(data: z.infer<typeof FormSchema>) {
    const res = await login(data);
    if (res.code === 0) {
      const userDataRes = res.data;
      if (userDataRes) {
        toast.info("Login...");

        document.cookie = `user-id=${userDataRes._id}`;
        document.cookie = `user-email=${userDataRes.email}`;
        document.cookie = `user-full-name=${userDataRes.fullName}`;
        document.cookie = `user-role-id=${userDataRes.roleId}`;
        
        router.push("/dashboard");
      }
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(formSubmit)}>
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Page Builder System</h1>
            <p className="text-balance text-muted-foreground">
              Welcome to Page Builder System
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
