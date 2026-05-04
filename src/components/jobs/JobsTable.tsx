"use client";

import { Eye, Trash2 } from "lucide-react";

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

const jobs = [
  {
    title: "Kitchen Renovation",
    customer: "Sarah Johnson",
    tradie: "Alex Builder",
    budget: "$8,500",
    status: "Completed",
    date: "2026-03-15",
  },
  {
    title: "Electrical Repairs",
    customer: "Mike Chen",
    tradie: "Emma Electrician",
    budget: "$450",
    status: "In Progress",
    date: "2026-04-10",
  },
  {
    title: "Plumbing Fix",
    customer: "Emily Davis",
    tradie: "Tom Plumber",
    budget: "$320",
    status: "Accepted",
    date: "2026-04-15",
  },
  {
    title: "House Painting",
    customer: "Sophie Brown",
    tradie: "Lisa Painter",
    budget: "$3,200",
    status: "In Progress",
    date: "2026-04-05",
  },
  {
    title: "Bathroom Tiling",
    customer: "Daniel Lee",
    tradie: "Chris Tiler",
    budget: "$2,100",
    status: "Completed",
    date: "2026-03-28",
  },
  {
    title: "Roof Repair",
    customer: "James Wilson",
    tradie: "-",
    budget: "$1,800",
    status: "Posted",
    date: "2026-04-18",
  },
  {
    title: "Deck Building",
    customer: "Olivia Martin",
    tradie: "Mark Mason",
    budget: "$5,500",
    status: "Matched",
    date: "2026-04-16",
  },
  {
    title: "AC Installation",
    customer: "Liam Taylor",
    tradie: "-",
    budget: "$2,400",
    status: "Cancelled",
    date: "2026-04-12",
  },
];

const statusMap: Record<string, { label: string; variant: string }> = {
  Completed: { label: "Completed", variant: "default" },
  "In Progress": { label: "In Progress", variant: "info" },
  Accepted: { label: "Accepted", variant: "warning" },
  Matched: { label: "Matched", variant: "secondary" },
  Posted: { label: "Posted", variant: "muted" },
  Cancelled: { label: "Cancelled", variant: "destructive" },
};

export default function JobsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Jobs (8)</CardTitle>
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
            {jobs.map((job) => (
              <TableRow key={job.title}>
                <TableCell className="font-medium text-zinc-900">
                  {job.title}
                </TableCell>
                <TableCell>{job.customer}</TableCell>
                <TableCell className="text-zinc-500">{job.tradie}</TableCell>
                <TableCell>{job.budget}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[job.status].variant as never}>
                    {statusMap[job.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-500">{job.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="rounded-full p-2 text-rose-500 hover:bg-rose-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
