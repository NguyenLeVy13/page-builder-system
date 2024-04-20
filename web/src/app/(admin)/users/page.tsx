"use client";

import { useEffect, useRef, useState } from "react";

import type { DeleteConfirmDialogRef } from "./components/delete-confirm-dialog";
import { User } from "@/types/user";

import { PlusIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import UserTable from "./components/user-table";
import DeleteConfirmDialog from "./components/delete-confirm-dialog";
import CreateOrUpdateDialog, {
  CreateOrUpdateDialogRef,
} from "./components/create-or-update-dialog";

import { getUserList } from "@/services/userApi";
import { getRoleList } from "@/services/roleApi";
import { Role } from "@/types/role";

function Users() {
  const deleteConfirmDialogRef = useRef<DeleteConfirmDialogRef>(null);
  const createOrUpdateDialogRef = useRef<CreateOrUpdateDialogRef>(null);

  const [userList, setUserList] = useState<User[]>([]);
  const [roleList, setRoleList] = useState<Role[]>([]);

  useEffect(() => {
    fetchDataList();
    fetchRoleList();
  }, []);

  async function fetchDataList() {
    const params = new URLSearchParams();
    const res = await getUserList(params);

    if (res.code === 0) {
      setUserList(res.data);
    }
  }

  async function fetchRoleList() {
    const params = new URLSearchParams();
    const res = await getRoleList(params);

    if (res.code === 0) {
      setRoleList(res.data);
    }
  }

  function handleDelete(id: string) {
    if (!deleteConfirmDialogRef.current) return;
    deleteConfirmDialogRef.current.open(id);
  }

  function handleOpenCreateOrUpdateDialog() {
    createOrUpdateDialogRef.current?.open();
  }

  function handleReload() {
    fetchDataList();
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>User list</CardTitle>
            <div>
              <Button
                className="me-2"
                onClick={() => handleOpenCreateOrUpdateDialog()}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                New user
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <UserTable
            data={userList}
            roleList={roleList}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <CreateOrUpdateDialog
        ref={createOrUpdateDialogRef}
        roleList={roleList}
        onReload={handleReload}
      />

      <DeleteConfirmDialog
        ref={deleteConfirmDialogRef}
        onReload={handleReload}
      />
    </div>
  );
}

export default Users;
