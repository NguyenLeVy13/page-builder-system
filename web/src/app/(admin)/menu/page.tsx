"use client";

import { useEffect, useRef, useState } from "react";

import type { DeleteConfirmDialogRef } from "./components/delete-confirm-dialog";
import { Menu } from "@/types/menu";

import { PlusIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MenuTable from "./components/menu-table";
import DeleteConfirmDialog from "./components/delete-confirm-dialog";
import CreateOrUpdateDialog, {
  CreateOrUpdateDialogRef,
} from "./components/create-or-update-dialog";

import { getMenuList } from "@/services/menuApi";

function Menu() {
  const deleteConfirmDialogRef = useRef<DeleteConfirmDialogRef>(null);
  const createOrUpdateDialogRef = useRef<CreateOrUpdateDialogRef>(null);

  const [menuList, setMenuList] = useState<Menu[]>([]);

  useEffect(() => {
    fetchDataList();
  }, []);

  async function fetchDataList() {
    const params = new URLSearchParams();
    const res = await getMenuList(params);

    if (res.code === 0) {
      setMenuList(res.data);
    }
  }

  function handleEdit(menu: Menu) {
    createOrUpdateDialogRef.current?.open(menu);
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
            <CardTitle>Menu list</CardTitle>
            <div>
              <Button
                className="me-2"
                onClick={() => handleOpenCreateOrUpdateDialog()}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
                New menu
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <MenuTable
            data={menuList}
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

export default Menu;
