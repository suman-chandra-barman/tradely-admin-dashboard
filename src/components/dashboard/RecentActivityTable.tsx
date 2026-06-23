"use client";

import { useEffect, useState } from "react";
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
import { useGetRecentActivityQuery } from "@/redux/api/dashboardApi";

export default function RecentActivityTable() {
  const { data: response, isLoading } = useGetRecentActivityQuery({ limit: 10 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatTimeAgo = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
      return date.toLocaleDateString();
    } catch {
      return isoString;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type?.toLowerCase()) {
      case "new job":
        return "warning";
      case "new tradie":
        return "secondary";
      case "new user":
        return "info";
      default:
        return "default";
    }
  };

  const showSkeleton = !mounted || isLoading;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showSkeleton ? (
              [1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-4 w-20 bg-zinc-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-40 bg-zinc-200 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-28 bg-zinc-100 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-16 bg-zinc-100 rounded animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-6 w-14 bg-zinc-200 rounded-full animate-pulse" />
                  </TableCell>
                </TableRow>
              ))
            ) : response?.data?.activities?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-zinc-500">
                  No recent activity found.
                </TableCell>
              </TableRow>
            ) : (
              response?.data?.activities?.map((row: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-zinc-900">
                    {row.activity_type}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="text-zinc-500">{row.details || "—"}</TableCell>
                  <TableCell className="text-zinc-500">{formatTimeAgo(row.time)}</TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(row.activity_type) as any}>
                      {row.status_label || row.activity_type}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
