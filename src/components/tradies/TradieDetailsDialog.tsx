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
  useGetTradieDetailsQuery,
  useChangeApprovalStatusMutation,
  useDeleteTradieMutation,
} from "@/redux/api/tradiesApi";
import { toast } from "react-toastify";

interface TradieDetailsDialogProps {
  tradieId: number;
}

export default function TradieDetailsDialog({
  tradieId,
}: TradieDetailsDialogProps) {
  const [open, setOpen] = useState(false);

  const { data: response, isLoading, isError } = useGetTradieDetailsQuery(
    tradieId,
    {
      skip: !open,
    }
  );

  const [changeStatus, { isLoading: isStatusUpdating }] =
    useChangeApprovalStatusMutation();
  const [deleteTradie, { isLoading: isDeleting }] = useDeleteTradieMutation();

  const tradie = response?.data;

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      await changeStatus({ id: tradieId, approval_status: newStatus }).unwrap();
      toast.success(`Tradie status updated to '${newStatus}'.`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update tradie status.");
    }
  };

  const handleDelete = async () => {
    if (!tradie) return;
    if (
      !window.confirm(`Are you sure you want to delete tradie ${tradie.name}?`)
    ) {
      return;
    }
    try {
      await deleteTradie(tradieId).unwrap();
      toast.success("Tradie successfully deleted.");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete tradie.");
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "warning";
      case "suspended":
        return "destructive";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
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
          <DialogTitle>Tradie Details</DialogTitle>
          <DialogDescription>View professional profile details</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="mt-6 space-y-4 animate-pulse">
            <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-1/4 bg-zinc-200/80 rounded" />
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
            Failed to load tradie details. Please try again.
          </div>
        ) : !tradie ? (
          <div className="mt-6 text-center text-zinc-500 py-6">
            Tradie profile not found.
          </div>
        ) : (
          <>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-400 font-semibold border border-zinc-200">
                {tradie.image ? (
                  <img
                    src={tradie.image}
                    alt={tradie.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xl">
                    {tradie.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="text-base font-semibold text-zinc-900">
                  {tradie.name}
                </p>
                <p className="text-sm text-zinc-500">{tradie.email}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={tradie.name} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>ID</Label>
                <Input value={String(tradie.id)} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={tradie.email || "—"} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={tradie.phone_number || "—"} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2 font-medium">
                <Label>User Joined</Label>
                <Input value={tradie.joined_at || "—"} readOnly className="bg-zinc-50" />
              </div>
              <div className="space-y-2">
                <Label>Approval status</Label>
                <div className="flex h-10 items-center">
                  <Badge variant={getStatusBadgeVariant(tradie.approval_status)}>
                    {tradie.approval_status.charAt(0).toUpperCase() +
                      tradie.approval_status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
              <div className="flex items-center gap-2">
                {tradie.approval_status === "pending" && (
                  <>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleUpdateStatus("rejected")}
                      disabled={isStatusUpdating}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus("approved")}
                      disabled={isStatusUpdating}
                    >
                      Approve
                    </Button>
                  </>
                )}
                {tradie.approval_status === "approved" && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleUpdateStatus("suspended")}
                    disabled={isStatusUpdating}
                  >
                    Suspend
                  </Button>
                )}
                {tradie.approval_status === "suspended" && (
                  <Button
                    size="sm"
                    onClick={() => handleUpdateStatus("approved")}
                    disabled={isStatusUpdating}
                  >
                    Activate
                  </Button>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                Delete Tradie
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
