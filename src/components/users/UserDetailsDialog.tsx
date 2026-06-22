"use client";

import { useState } from "react";
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
import {
  useGetUserDetailsQuery,
  useToggleBlockUserMutation,
  useDeleteUserMutation,
} from "@/redux/api/usersApi";
import { toast } from "react-toastify";

interface UserDetailsDialogProps {
  userId: number;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return dateString;
  }
};

export default function UserDetailsDialog({ userId }: UserDetailsDialogProps) {
  const [open, setOpen] = useState(false);

  const { data: response, isLoading, isError } = useGetUserDetailsQuery(userId, {
    skip: !open,
  });

  const [toggleBlock, { isLoading: isSuspending }] = useToggleBlockUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const user = response?.data;

  const handleToggleBlock = async () => {
    if (!user) return;
    try {
      const isBlocked = user.is_blocked;
      await toggleBlock({ id: userId, is_blocked: !isBlocked }).unwrap();
      toast.success(
        `User successfully ${isBlocked ? "activated" : "suspended"}.`
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user status.");
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    if (!window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
      return;
    }
    try {
      await deleteUser(userId).unwrap();
      toast.success("User successfully deleted.");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete user.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 transition-colors">
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
      <DialogContent className="max-w-xl animate-in fade-in zoom-in duration-200">
        <DialogCloseButton />
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>View user details</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="mt-6 space-y-4 animate-pulse">
            <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-1/4 bg-zinc-200 rounded" />
                  <div className="h-10 bg-zinc-100 rounded-xl" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <div className="h-10 w-24 bg-zinc-200 rounded-xl" />
              <div className="h-10 w-28 bg-zinc-200 rounded-xl" />
            </div>
          </div>
        ) : isError ? (
          <div className="mt-6 text-center text-rose-500 font-medium py-6">
            Failed to load user details. Please try again.
          </div>
        ) : !user ? (
          <div className="mt-6 text-center text-zinc-500 py-6">
            User not found.
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={user.name} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>ID</Label>
                <Input value={String(user.id)} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={user.phone_number || "—"} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={user.location || "—"} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>Total Jobs</Label>
                <Input value={String(user.total_jobs)} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>User Joined</Label>
                <Input value={formatDate(user.created_at)} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Activity status</Label>
                <div className="flex h-10 items-center">
                  <Badge variant={user.is_blocked ? "destructive" : "default"}>
                    {user.is_blocked ? "Blocked" : "Active"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                variant="secondary"
                onClick={handleToggleBlock}
                disabled={isSuspending}
              >
                {user.is_blocked ? "Activate" : "Suspend"}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                Delete User
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
