"use client";

import { FileText, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LegalPolicyDialog from "@/components/settings/LegalPolicyDialog";
import { useGetLegalDocumentsQuery } from "@/redux/api/settingsApi";

export default function LegalDocumentsCard() {
  const { data: response, isLoading } = useGetLegalDocumentsQuery();

  const getIcon = (docType: string) => {
    if (docType === "terms_of_use") {
      return FileText;
    }
    return Shield;
  };

  const getDocTypeLabel = (docType: string) => {
    switch (docType) {
      case "privacy_policy":
        return "Privacy Policy";
      case "terms_of_use":
        return "Terms of Use";
      case "cookie_policy":
        return "Cookie Policy";
      default:
        return "Legal Document";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Legal</CardTitle>
          <p className="text-sm text-zinc-500">Manage your legal documents.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200/70 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-zinc-200 animate-pulse" />
                  <div className="space-y-1">
                    <div className="h-4 w-28 bg-zinc-200 rounded animate-pulse" />
                    <div className="h-3 w-20 bg-zinc-100 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-14 bg-zinc-200 rounded animate-pulse" />
                  <div className="h-8 w-14 bg-zinc-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const docs = response?.data || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal</CardTitle>
        <p className="text-sm text-zinc-500">Manage your legal documents.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {docs.map((doc: any) => {
            const IconComponent = getIcon(doc.doc_type);
            return (
              <div
                key={doc.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200/70 bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-100 p-2 text-amber-600">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {doc.title || getDocTypeLabel(doc.doc_type)}
                    </p>
                    <p className="text-xs text-zinc-500">
                      Version {doc.version || "1.0"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <LegalPolicyDialog doc={doc} triggerLabel="View" />
                  <LegalPolicyDialog doc={doc} triggerLabel="Edit" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
