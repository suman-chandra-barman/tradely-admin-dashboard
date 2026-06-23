"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateLegalDocumentMutation } from "@/redux/api/settingsApi";

interface LegalPolicyDialogProps {
  doc: {
    id: number;
    doc_type: string;
    title: string;
    content: string;
    version: string;
    updated_at: string;
  };
  triggerLabel: "View" | "Edit";
}

export default function LegalPolicyDialog({
  doc,
  triggerLabel,
}: LegalPolicyDialogProps) {
  const [open, setOpen] = useState(false);
  const [updateLegalDocument, { isLoading: isUpdating }] =
    useUpdateLegalDocumentMutation();

  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("");
  const [content, setContent] = useState("");

  // Sync state whenever the dialog opens or document changes
  useEffect(() => {
    if (open && doc) {
      setTitle(doc.title || "");
      setVersion(doc.version || "");
      setContent(doc.content || "");
    }
  }, [open, doc]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!version.trim()) {
      toast.error("Version is required.");
      return;
    }
    if (!content.trim()) {
      toast.error("Content is required.");
      return;
    }

    try {
      const res = await updateLegalDocument({
        id: doc.id,
        body: {
          doc_type: doc.doc_type,
          title: title.trim(),
          content: content.trim(),
          version: version.trim(),
        },
      }).unwrap();

      toast.success("Document updated successfully.");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update legal document.");
    }
  };

  const isViewMode = triggerLabel === "View";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isViewMode ? "secondary" : "outline"}
          size="sm"
        >
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogCloseButton />
        <DialogHeader>
          <DialogTitle>{isViewMode ? `View ${doc.title}` : `Edit ${doc.title}`}</DialogTitle>
          <DialogDescription>
            {isViewMode ? "Read-only view of this document." : "Modify fields below to update the policy document."}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="docTitle">Document Title</Label>
              <Input
                id="docTitle"
                value={isViewMode ? doc.title : title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isViewMode}
                className="bg-zinc-50 font-medium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="docVersion">Version</Label>
              <Input
                id="docVersion"
                value={isViewMode ? doc.version : version}
                onChange={(e) => setVersion(e.target.value)}
                disabled={isViewMode}
                className="bg-zinc-50 font-medium"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="docLastUpdated">Last Updated</Label>
            <Input
              id="docLastUpdated"
              value={new Date(doc.updated_at).toLocaleString()}
              disabled
              className="bg-zinc-100 font-medium text-zinc-500 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="docContent">Content</Label>
            <Textarea
              id="docContent"
              value={isViewMode ? doc.content : content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isViewMode}
              className="min-h-[180px] bg-zinc-50 font-medium leading-relaxed"
            />
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <DialogClose asChild>
            <Button variant="secondary">
              {isViewMode ? "Close" : "Cancel"}
            </Button>
          </DialogClose>
          {!isViewMode && (
            <Button onClick={handleSave} disabled={isUpdating}>
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
