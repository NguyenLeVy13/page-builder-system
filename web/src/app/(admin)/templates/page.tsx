'use client'

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TemplateTable from "@/components/templateTable";
import { toast } from "sonner"

function Templates() {
  const router = useRouter();

  function handleRedirectToBuilder() {
    toast("Redirecting to builder...", {
      action: {
        label: "Close",
        onClick: () => {},
      },
    })
    router.push('/builder')
  };

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
          <TemplateTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default Templates;
