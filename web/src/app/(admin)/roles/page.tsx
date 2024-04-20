"use client";

import { useEffect, useRef, useState } from "react";

import type { DeleteConfirmDialogRef } from "./components/delete-confirm-dialog";
import { Role } from "@/types/role";

import { PlusIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import RoleTable from "./components/role-table";
import DeleteConfirmDialog from "./components/delete-confirm-dialog";
import CreateOrUpdateDialog, {
  CreateOrUpdateDialogRef,
} from "./components/create-or-update-dialog";

import { getRoleList } from "@/services/roleApi";
import type { PermissionDrawerRef } from "./components/permission-drawer";
import PermissionDrawer from "./components/permission-drawer";
import useFunctionPermission from "@/hooks/useFunctionPermission";

function Roles() {
  const funcPermission = useFunctionPermission();

  const deleteConfirmDialogRef = useRef<DeleteConfirmDialogRef>(null);
  const createOrUpdateDialogRef = useRef<CreateOrUpdateDialogRef>(null);
  const permissionDrawerRef = useRef<PermissionDrawerRef>(null);

  const [roleList, setRoleList] = useState<Role[]>([]);

  useEffect(() => {
    fetchDataList();
  }, []);

  async function fetchDataList() {
    const params = new URLSearchParams();
    const res = await getRoleList(params);

    if (res.code === 0) {
      setRoleList(res.data);
    }
  }

  function handleOpenPermissionDrawer(role: Role) {
    permissionDrawerRef.current?.open(role);
  }

  function handleEdit(role: Role) {
    createOrUpdateDialogRef.current?.open(role);
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
            <CardTitle>Role list</CardTitle>
            <div>
              {funcPermission.check("create-role") && (
                <Button
                  className="me-2"
                  onClick={() => handleOpenCreateOrUpdateDialog()}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New role
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <RoleTable
            data={roleList}
            onPermission={handleOpenPermissionDrawer}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <CreateOrUpdateDialog
        ref={createOrUpdateDialogRef}
        onReload={handleReload}
      />

      <DeleteConfirmDialog
        ref={deleteConfirmDialogRef}
        onReload={handleReload}
      />

      <PermissionDrawer ref={permissionDrawerRef} />
    </div>
  );
}

export default Roles;
