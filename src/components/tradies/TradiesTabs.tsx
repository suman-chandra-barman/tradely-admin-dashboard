"use client";

import { Ban, Trash2 } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetTradiesQuery,
  useChangeApprovalStatusMutation,
  useDeleteTradieMutation,
} from "@/redux/api/tradiesApi";
import TradieDetailsDialog from "@/components/tradies/TradieDetailsDialog";

const ApprovedSkeleton = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <TableRow key={index} className="animate-pulse">
        <TableCell>
          <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-36" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-28" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-12" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-12" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-6 w-16 rounded-full" />
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </TableCell>
      </TableRow>
    ))}
  </>
);

const PendingSkeleton = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <TableRow key={index} className="animate-pulse">
        <TableCell>
          <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-36" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-28" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-24 rounded-full" />
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded-lg" />
            <Skeleton className="h-8 w-16 rounded-lg" />
          </div>
        </TableCell>
      </TableRow>
    ))}
  </>
);

export default function TradiesTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search") || "";

  // The active tab is "pending" if status is pending, otherwise "tradies"
  const activeTab = status === "pending" ? "pending" : "tradies";

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useGetTradiesQuery({
    status,
    search,
  });

  const [changeStatus] = useChangeApprovalStatusMutation();
  const [deleteTradie] = useDeleteTradieMutation();

  const tradies = response?.data || [];

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "pending") {
      params.set("status", "pending");
    } else {
      params.delete("status");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await changeStatus({ id, approval_status: newStatus }).unwrap();
      toast.success(`Status updated to '${newStatus}'.`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update tradie status.");
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (
      !window.confirm(`Are you sure you want to delete tradie ${name}?`)
    ) {
      return;
    }
    try {
      await deleteTradie(id).unwrap();
      toast.success("Tradie successfully deleted.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete tradie.");
    }
  };

  const getStatusBadgeVariant = (statusVal: string) => {
    switch (statusVal) {
      case "approved":
        return "default";
      case "suspended":
        return "destructive";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const isListLoading = isLoading || isFetching;

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="tradies">Tradies</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
      </TabsList>

      <TabsContent value="tradies">
        <Card>
          <CardHeader className="mb-4">
            <CardTitle>
              All Tradies ({isListLoading ? "..." : tradies.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Service Area</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Completed Jobs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isListLoading ? (
                  <ApprovedSkeleton />
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-rose-500 font-medium"
                    >
                      Failed to load tradies. Please try again.
                    </TableCell>
                  </TableRow>
                ) : tradies.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-zinc-500"
                    >
                      No tradies found matching the filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  tradies.map((tradie) => (
                    <TableRow key={tradie.id}>
                      <TableCell className="font-medium text-zinc-900">
                        {tradie.name}
                      </TableCell>
                      <TableCell className="text-zinc-500">
                        {tradie.skills || "—"}
                      </TableCell>
                      <TableCell className="text-zinc-500">
                        {tradie.service_area || "—"}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-amber-500">★</span>
                        <span className="ml-1 text-zinc-700">
                          {tradie.rating}
                        </span>
                      </TableCell>
                      <TableCell>{tradie.completed_jobs}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(tradie.approval_status)}
                        >
                          {tradie.approval_status.charAt(0).toUpperCase() +
                            tradie.approval_status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TradieDetailsDialog tradieId={tradie.id} />
                          <button
                            onClick={() =>
                              handleUpdateStatus(
                                tradie.id,
                                tradie.approval_status === "suspended"
                                  ? "approved"
                                  : "suspended"
                              )
                            }
                            className={`rounded-full p-2 transition-colors ${
                              tradie.approval_status === "suspended"
                                ? "text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
                            }`}
                            title={
                              tradie.approval_status === "suspended"
                                ? "Activate tradie"
                                : "Suspend tradie"
                            }
                          >
                            <Ban className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(tradie.id, tradie.name)}
                            className="rounded-full p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                            title="Delete tradie"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="pending">
        <Card>
          <CardHeader>
            <CardTitle>
              Tradies Pending Request ({isListLoading ? "..." : tradies.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Service Area</TableHead>
                  <TableHead>Registration ID</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isListLoading ? (
                  <PendingSkeleton />
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-rose-500 font-medium"
                    >
                      Failed to load pending requests.
                    </TableCell>
                  </TableRow>
                ) : tradies.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-zinc-500"
                    >
                      No pending requests.
                    </TableCell>
                  </TableRow>
                ) : (
                  tradies.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium text-zinc-900">
                        {request.name}
                      </TableCell>
                      <TableCell className="text-zinc-500">
                        {request.skills || "—"}
                      </TableCell>
                      <TableCell className="text-zinc-500">
                        {request.service_area || "—"}
                      </TableCell>
                      <TableCell>
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600">
                          TRD-{request.id}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleUpdateStatus(request.id, "rejected")
                            }
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleUpdateStatus(request.id, "approved")
                            }
                          >
                            Approve
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
