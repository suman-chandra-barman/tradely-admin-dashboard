"use client";

import { FileText, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LegalPolicyDialog from "@/components/settings/LegalPolicyDialog";

const docs = [
  { title: "Privacy Policy", icon: Shield },
  { title: "Terms of use", icon: FileText },
  { title: "Cookie Policy", icon: Shield },
];

export default function LegalDocumentsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal</CardTitle>
        <p className="text-sm text-zinc-500">Manage your legal documents.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {docs.map((doc) => (
            <div
              key={doc.title}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200/70 bg-white px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-100 p-2 text-amber-600">
                  <doc.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">
                    {doc.title}
                  </p>
                  <p className="text-xs text-zinc-500">Legal Document</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LegalPolicyDialog title={doc.title} triggerLabel="View" />
                <LegalPolicyDialog title={doc.title} triggerLabel="Edit" />
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
