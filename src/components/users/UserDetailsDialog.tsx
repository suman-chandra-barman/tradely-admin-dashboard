"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserDetailsDialogProps {
  name: string;
  id: string;
  email: string;
  phone: string;
  joined: string;
  status: "Active" | "Blocked";
}

export default function UserDetailsDialog({
  name,
  id,
  email,
  phone,
  joined,
  status,
}: UserDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100">
          <span className="sr-only">View details</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogCloseButton />
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>View user details</DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-2xl bg-zinc-100">
            <img
              src="https://i.pravatar.cc/120?img=32"
              alt={name}
              width={64}
              height={64}
            />
          </div>
          <div>
            <p className="text-base font-semibold text-zinc-900">{name}</p>
            <p className="text-sm text-zinc-500">{email}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={name} readOnly className="bg-zinc-50" />
          </div>
          <div className="space-y-2">
            <Label>ID</Label>
            <Input value={id} readOnly className="bg-zinc-50" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} readOnly className="bg-zinc-50" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={phone} readOnly className="bg-zinc-50" />
          </div>
          <div className="space-y-2">
            <Label>User Joined</Label>
            <Input value={joined} readOnly className="bg-zinc-50" />
          </div>
          <div className="space-y-2">
            <Label>Activity status</Label>
            <div className="flex h-10 items-center">
              <Badge variant={status === "Active" ? "default" : "destructive"}>
                {status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button variant="secondary">Suspend</Button>
          <Button variant="destructive">Delete User</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
