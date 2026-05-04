"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileSettingsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <p className="text-sm text-zinc-500">
          Configure basic business information.
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl border border-zinc-200/70 bg-white p-5">
          <p className="text-sm font-semibold text-zinc-900">
            Personal Details
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[120px_1fr]">
            <div className="h-28 w-28 overflow-hidden rounded-2xl bg-zinc-100">
              <img
                src="https://i.pravatar.cc/120?img=47"
                alt="Admin"
                width={112}
                height={112}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input defaultValue="Maria Gustoba" className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>Short Bio</Label>
                <Input defaultValue="Admin and CEO" className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>Contact Phone</Label>
                <Input defaultValue="(513) 874-9999" className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input
                  defaultValue="example@gmail.com"
                  className="bg-zinc-50"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
