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
import { Textarea } from "@/components/ui/textarea";
import { useGetJobDetailsQuery, useDeleteJobMutation } from "@/redux/api/jobsApi";
import { toast } from "react-toastify";

interface JobDetailsDialogProps {
  jobId: number;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "—";
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

export default function JobDetailsDialog({ jobId }: JobDetailsDialogProps) {
  const [open, setOpen] = useState(false);

  const { data: response, isLoading, isError } = useGetJobDetailsQuery(jobId, {
    skip: !open,
  });

  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const job = response?.data;

  const handleDelete = async () => {
    if (!job) return;
    if (!window.confirm(`Are you sure you want to delete job "${job.title}"?`)) {
      return;
    }
    try {
      await deleteJob(jobId).unwrap();
      toast.success("Job successfully deleted.");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete job.");
    }
  };

  const getStatusBadgeVariant = (statusVal: string) => {
    switch (statusVal) {
      case "completed":
        return "default";
      case "active":
      case "in_progress":
        return "info";
      case "accepted":
      case "matched":
      case "posted":
        return "warning";
      case "cancelled":
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
      <DialogContent className="max-w-2xl animate-in fade-in zoom-in duration-200">
        <DialogCloseButton />
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
          <DialogDescription>View job lifecycle and settings details</DialogDescription>
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
              <div className="h-10 w-28 bg-zinc-200 rounded-xl" />
            </div>
          </div>
        ) : isError ? (
          <div className="mt-6 text-center text-rose-500 font-medium py-6">
            Failed to load job details. Please try again.
          </div>
        ) : !job ? (
          <div className="mt-6 text-center text-zinc-500 py-6">
            Job details not found.
          </div>
        ) : (
          <>
            <div className="mt-4 flex flex-wrap gap-6 items-center border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                  {job.client_image ? (
                    <img src={job.client_image} alt={job.client_name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-zinc-500 text-sm font-semibold">{job.client_name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-semibold uppercase">Client</p>
                  <p className="text-sm font-semibold text-zinc-800">{job.client_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                  {job.tradie_image ? (
                    <img src={job.tradie_image} alt={job.tradie_name || "Tradie"} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-zinc-500 text-sm font-semibold">
                      {job.tradie_name ? job.tradie_name.charAt(0).toUpperCase() : "—"}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-xs text-zinc-400 font-semibold uppercase">Assigned Tradie</p>
                  <p className="text-sm font-semibold text-zinc-800">{job.tradie_name || "Unassigned"}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 col-span-2">
                <Label>Job Title</Label>
                <Input value={job.title} readOnly className="bg-zinc-50 font-medium" />
              </div>

              <div className="space-y-2 col-span-2">
                <Label>Description</Label>
                <Textarea value={job.description || "No description provided."} readOnly className="bg-zinc-50 min-h-20 resize-none" />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={job.category.name} readOnly className="bg-zinc-50" />
              </div>

              <div className="space-y-2">
                <Label>Budget</Label>
                <Input value={`$${job.budget} / ${job.budget_unit}`} readOnly className="bg-zinc-50 font-medium" />
              </div>

              <div className="space-y-2">
                <Label>Service Type / Urgency</Label>
                <Input value={`${job.service_type} (${job.urgency})`} readOnly className="bg-zinc-50 capitalize" />
              </div>

              <div className="space-y-2">
                <Label>Duty Date / Duration</Label>
                <Input value={`${job.duty_date} (${job.duration} hours)`} readOnly className="bg-zinc-50" />
              </div>

              <div className="space-y-2 col-span-2">
                <Label>Address</Label>
                <Input value={job.address || "—"} readOnly className="bg-zinc-50" />
              </div>

              <div className="space-y-2">
                <Label>Posted At</Label>
                <Input value={formatDate(job.posted_at)} readOnly className="bg-zinc-50" />
              </div>

              <div className="space-y-2">
                <Label>Activity Status</Label>
                <div className="flex h-10 items-center">
                  <Badge variant={getStatusBadgeVariant(job.status)}>
                    {job.status.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
              </div>

              {job.images && job.images.length > 0 && (
                <div className="space-y-2 col-span-2">
                  <Label>Job Attachments</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {job.images.map((img, idx) => (
                      <div key={idx} className="h-16 w-16 overflow-hidden rounded-lg bg-zinc-50 border border-zinc-200">
                        <img src={img} alt="Job media" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end border-t border-zinc-100 pt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                Delete Job
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
