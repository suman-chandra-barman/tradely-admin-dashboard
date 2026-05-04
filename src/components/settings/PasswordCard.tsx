"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PasswordCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <p className="text-sm text-zinc-500">
          Change your password to keep your account secure.
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl border border-zinc-200/70 bg-white p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input
                type="password"
                defaultValue="********"
                className="bg-zinc-50"
              />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                defaultValue="********"
                className="bg-zinc-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                defaultValue="********"
                className="bg-zinc-50"
              />
            </div>
          </div>
          <div className="mt-5">
            <Button size="sm">Change Password</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
