"use client";

import { Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetJobsQuery, useDeleteJobMutation } from "@/redux/api/jobsApi";
import JobsTableSkeleton from "@/components/skeletons/JobsTableSkeleton";
import JobDetailsDialog from "@/components/jobs/JobDetailsDialog";

const statusMap: Record<string, { label: string; variant: string }> = {
  posted: { label: "Posted", variant: "warning" },
  active: { label: "Active", variant: "info" },
  matched: { label: "Matched", variant: "warning" },
  accepted: { label: "Accepted", variant: "warning" },
  in_progress: { label: "In Progress", variant: "info" },
  completed: { label: "Completed", variant: "default" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

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

export default function JobsTable() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search") || "";

  const { data: response, isLoading, isFetching, isError } = useGetJobsQuery({
    status,
    search,
  });

  const [deleteJob] = useDeleteJobMutation();

  const jobs = response?.data || [];

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete job "${title}"?`)) {
      return;
    }
    try {
      await deleteJob(id).unwrap();
      toast.success("Job successfully deleted.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete job.");
    }
  };

  const isListLoading = isLoading || isFetching;

  return (
    <Card>
      <CardHeader className="mb-4">
        <CardTitle>
          All Jobs ({isListLoading ? "..." : jobs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Tradie</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isListLoading ? (
              <JobsTableSkeleton />
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-rose-500 font-medium"
                >
                  Failed to load jobs. Please try again.
                </TableCell>
              </TableRow>
            ) : jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-zinc-500"
                >
                  No jobs found matching the filters.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => {
                const mappedStatus = statusMap[job.status] || {
                  label: job.status,
                  variant: "secondary",
                };
                return (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium text-zinc-900">
                      {job.title}
                    </TableCell>
                    <TableCell>{job.client_name}</TableCell>
                    <TableCell className="text-zinc-500">
                      {job.tradie_name || "—"}
                    </TableCell>
                    <TableCell>${job.budget}</TableCell>
                    <TableCell>
                      <Badge variant={mappedStatus.variant as any}>
                        {mappedStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {formatDate(job.posted_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <JobDetailsDialog jobId={job.id} />
                        <button
                          onClick={() => handleDelete(job.id, job.title)}
                          className="rounded-full p-2 text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Delete job"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
