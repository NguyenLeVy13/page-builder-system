"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { DeleteConfirmDialogRef } from "./components/delete-confirm-dialog";
import { Template } from "@/types/template";

import { StackIcon, MixIcon } from "@radix-ui/react-icons";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TemplateTable from "./components/template-table";
import DeleteConfirmDialog from "./components/delete-confirm-dialog";
import { toast } from "sonner";

//? APIS
import { getTemplateList } from "@/services/templateApi";
import useFunctionPermission from "@/hooks/useFunctionPermission";

function Templates() {
  const router = useRouter();
  const funcPermission = useFunctionPermission();

  const deleteConfirmDialogRef = useRef<DeleteConfirmDialogRef>(null);

  const [templateList, setTemplateList] = useState<Template[]>([]);

  useEffect(() => {
    fetchTemplateList();
  }, []);

  async function fetchTemplateList() {
    const params = new URLSearchParams();
    const res = await getTemplateList(params);

    if (res.code === 0) {
      setTemplateList(res.data);
    }
  }

  function handleRedirectToBuilder(type: string) {
    toast.info("Redirecting to builder...");
    router.push(`/builder/new/${type}`);
  }

  function handleDeleteTemplate(templateId: string) {
    if (!deleteConfirmDialogRef.current) return;
    deleteConfirmDialogRef.current.open(templateId);
  }

  function handleConfirmDeleteTemplate() {
    fetchTemplateList();
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Template list</CardTitle>
            <div>
              {funcPermission.check("create-template-with-example") && (
                <Button
                  className="me-2"
                  onClick={() => handleRedirectToBuilder("example")}
                >
                  <MixIcon className="mr-2 h-4 w-4" />
                  Create with example
                </Button>
              )}
              {funcPermission.check("create-template-with-blank") && (
                <Button onClick={() => handleRedirectToBuilder("blank")}>
                  <StackIcon className="mr-2 h-4 w-4" />
                  Create with blank
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent>
          <TemplateTable
            data={templateList}
            onDeleteTemplate={handleDeleteTemplate}
          />
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        ref={deleteConfirmDialogRef}
        onConfirm={handleConfirmDeleteTemplate}
      />
    </div>
  );
}

export default Templates;
