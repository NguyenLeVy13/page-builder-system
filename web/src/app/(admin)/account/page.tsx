"use client";

import { getUserInfoCookie, setUserInfoCookie } from "@/auth/user";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useEffect, useMemo, useRef } from "react";
import { updateInfoById } from "@/services/userApi";
import { toast } from "sonner";
import ChangePasswordDialog, {
  ChangePasswordDialogRef,
} from "./components/change-password-dialog";
import useFunctionPermission from "@/hooks/useFunctionPermission";

function Account() {
  const funcPermission = useFunctionPermission();

  const userInfoCookie = useMemo(() => getUserInfoCookie(), []);

  const emailRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const changePasswordDialogRef = useRef<ChangePasswordDialogRef>(null);

  useEffect(() => {
    emailRef.current!.value = userInfoCookie.email;
    fullNameRef.current!.value = userInfoCookie["full-name"];
  }, [emailRef.current, fullNameRef.current]);

  async function handleSaveFullname() {
    if (!fullNameRef.current!.value) {
      toast.error("Full name is required");
    }

    const res = await updateInfoById(userInfoCookie.id, {
      fullName: fullNameRef.current!.value,
    });
    if (res.code === 0) {
      // Update cookie
      const cookies = {
        ...userInfoCookie,
        "full-name": fullNameRef.current!.value,
      };
      setUserInfoCookie(cookies);

      toast.success("Update full name successfully");
    } else {
      toast.error(res.message);
    }
  }

  function handleOpenPasswordDialog() {
    changePasswordDialogRef.current!.open();
  }

  return (
    <div className="flex justify-center">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>Account details</CardTitle>
          <CardDescription>
            This is your account details. You can change your email, full name
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex align-middle items-center">
              <Label className="me-1 w-[80px]" htmlFor="email">
                Email:
              </Label>
              <Input
                ref={emailRef}
                className="me-1 flex-1"
                id="email"
                placeholder="Enter your email..."
                disabled
              />
            </div>
            <Separator />
            <div className="flex align-middle items-center">
              <Label className="me-1 w-[80px]" htmlFor="fullName">
                Full name:
              </Label>
              <Input
                ref={fullNameRef}
                className="me-1 flex-1"
                id="fullName"
                placeholder="Enter your full name..."
              />
              <Button
                onClick={handleSaveFullname}
                disabled={!funcPermission.check("update-account-info")}
              >
                Save
              </Button>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Button
                variant="secondary"
                onClick={handleOpenPasswordDialog}
                disabled={!funcPermission.check("change-account-password")}
              >
                Change password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordDialog ref={changePasswordDialogRef} />
    </div>
  );
}

export default Account;
