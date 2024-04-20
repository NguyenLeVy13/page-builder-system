"use client";

import { useEffect, useRef, useState } from "react";

import type { DeleteConfirmDialogRef } from "./components/delete-confirm-dialog";
import { FuncType } from "@/types/function";

import { PlusIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FunctionTable from "./components/function-table";
import DeleteConfirmDialog from "./components/delete-confirm-dialog";
import CreateOrUpdateDialog, {
  CreateOrUpdateDialogRef,
} from "./components/create-or-update-dialog";

import { getFunctionList } from "@/services/functionApi";
import useFunctionPermission from "@/hooks/useFunctionPermission";

function Functions() {
  const funcPermission = useFunctionPermission();

  const deleteConfirmDialogRef = useRef<DeleteConfirmDialogRef>(null);
  const createOrUpdateDialogRef = useRef<CreateOrUpdateDialogRef>(null);

  const [functionList, setFunctionList] = useState<FuncType[]>([]);

  useEffect(() => {
    fetchDataList();
  }, []);

  async function fetchDataList() {
    const params = new URLSearchParams();
    const res = await getFunctionList(params);

    if (res.code === 0) {
      setFunctionList(res.data);
    }
  }

  function handleEdit(func: FuncType) {
    createOrUpdateDialogRef.current?.open(func);
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
            <CardTitle>Function list</CardTitle>
            <div>
              {funcPermission.check("create-function") && (
                <Button
                  className="me-2"
                  onClick={() => handleOpenCreateOrUpdateDialog()}
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  New function
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <FunctionTable
            data={functionList}
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
    </div>
  );
}

export default Functions;
