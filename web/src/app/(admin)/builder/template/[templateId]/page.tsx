"use client";

import { Data, Puck } from "@measured/puck";
import puckConfig from "../../puck.config";
import "@measured/puck/puck.css";
import styles from "../../puck.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Template, TemplateData } from "@/types/template";
import { useParams } from "next/navigation";
import { findTemplate } from "@/services/templateApi";
import { toast } from "sonner";
import PublishDialog from "../../components/publish-dialog";

type PublishDialogRef = {
  open: (data: Data, template?: Template) => void;
  close: () => void;
};

function EditTemplateBuilder() {
  // Force re-render
  const key = Math.random().toString(36).substring(7);

  // Use hooks
  const params = useParams();

  // Refs
  const publishDialogRef = useRef<PublishDialogRef>(null);

  // States
  const [template, setTemplate] = useState<Template>({
    title: "",
  });
  const [templateData, setTemplateData] = useState<TemplateData>({
    content: [],
    root: { props: { title: "" } },
    zones: {},
  });

  const handleOpenPublishDialog = (data: Data) => {
    publishDialogRef.current?.open(data, template);
  };

  const mapTemplateData = useCallback(
    (template: Template): TemplateData | null => {
      if (template.data) {
        try {
          const data = JSON.parse(template.data) as TemplateData;
          return data;
        } catch (error) {
          console.error("Failed to parse template data", error);
          return null;
        }
      }

      return null;
    },
    []
  );

  const fetchTemplate = useCallback(async () => {
    const res = await findTemplate(params.templateId as string);
    if (res.code === 0) {
      const template = res.data;

      if (!template) {
        toast.error("Template not found");
        return;
      }

      const templateData = mapTemplateData(template);

      if (!templateData) {
        toast.error("Failed to parse template data");
        return;
      }

      setTemplate(template);
      setTemplateData(templateData);
    } else {
      toast.error(res.message);
    }
  }, [params.templateId, mapTemplateData]);

  useEffect(() => {
    fetchTemplate();
  }, [fetchTemplate]);

  return (
    <div className={styles.container}>
      <Puck
        key={key}
        config={puckConfig}
        data={templateData!}
        onPublish={handleOpenPublishDialog}
      />
      <PublishDialog ref={publishDialogRef} type="update" />
    </div>
  );
}

export default EditTemplateBuilder;
