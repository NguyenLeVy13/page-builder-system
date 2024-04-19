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

//? APIS
import { getRoleList } from "@/services/roleApi";

function Roles() {
  const deleteConfirmDialogRef = useRef<DeleteConfirmDialogRef>(null);

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

  function handleEdit(id: string) {

  }

  function handleDelete(id: string) {
    if (!deleteConfirmDialogRef.current) return;
    deleteConfirmDialogRef.current.open(id);
  }

  function handleConfirmDelete() {
    fetchDataList();
  }

  function handleOpenCreateOrUpdateDialog() {
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Template list</CardTitle>
            <div>
              <Button className="me-2" onClick={() => handleOpenCreateOrUpdateDialog()}>
                <PlusIcon className="mr-2 h-4 w-4" />
                New role
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <RoleTable
            data={roleList}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        ref={deleteConfirmDialogRef}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default Roles;
