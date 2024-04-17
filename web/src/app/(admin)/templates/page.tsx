'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { DeleteConfirmDialogRef } from "./components/delete-confirm-dialog";
import { Template } from "@/types/template";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TemplateTable from "./components/template-table";
import DeleteConfirmDialog from "./components/delete-confirm-dialog";
import { toast } from "sonner"

//? APIS
import { getTemplateList } from "@/services/templateApi";

function Templates() {
  const router = useRouter();

  const deleteConfirmDialogRef = useRef<DeleteConfirmDialogRef>(null);

  const [templateList, setTemplateList] = useState<Template[]>([]);

  useEffect(() => {
    fetchTemplateList()
  }, [])
  
  async function fetchTemplateList() {
    const params = new URLSearchParams()
    const res = await getTemplateList(params);

    if (res.code === 0) {
      setTemplateList(res.data)
    }
  }

  function handleRedirectToBuilder() {
    toast.info("Redirecting to builder...")
    router.push('/builder')
  };

  function handleDeleteTemplate(templateId: string) {
    if (!deleteConfirmDialogRef.current) return
    deleteConfirmDialogRef.current.open(templateId)
  }

  function handleConfirmDeleteTemplate() {
    fetchTemplateList()
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Template list</CardTitle>
            <Button onClick={handleRedirectToBuilder}>Add new</Button>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <TemplateTable data={templateList} onDeleteTemplate={handleDeleteTemplate} />
        </CardContent>
      </Card>

      <DeleteConfirmDialog ref={deleteConfirmDialogRef} onConfirm={handleConfirmDeleteTemplate} />
    </div>
  );
}

export default Templates;
