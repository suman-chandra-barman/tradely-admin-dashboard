"use client";

import { Ban, Trash2 } from "lucide-react";

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
import UserDetailsDialog from "@/components/users/UserDetailsDialog";

const users = [
  {
    name: "Sarah Johnson",
    phone: "+61 412 345 678",
    location: "Melbourne, VIC",
    jobs: 8,
    status: "Active",
    created: "2025-12-15",
    id: "PRD001",
    email: "sarah@example.com",
    joined: "05 April 2026",
  },
  {
    name: "Mike Chen",
    phone: "+61 423 456 789",
    location: "Sydney, NSW",
    jobs: 12,
    status: "Active",
    created: "2025-11-20",
    id: "PRD002",
    email: "mike@example.com",
    joined: "20 March 2026",
  },
  {
    name: "Emily Davis",
    phone: "+61 434 567 890",
    location: "Brisbane, QLD",
    jobs: 5,
    status: "Active",
    created: "2026-01-08",
    id: "PRD003",
    email: "emily@example.com",
    joined: "08 January 2026",
  },
  {
    name: "James Wilson",
    phone: "+61 445 678 901",
    location: "Perth, WA",
    jobs: 3,
    status: "Blocked",
    created: "2025-10-12",
    id: "PRD004",
    email: "james@example.com",
    joined: "12 October 2025",
  },
  {
    name: "Sophie Brown",
    phone: "+61 456 789 012",
    location: "Adelaide, SA",
    jobs: 15,
    status: "Active",
    created: "2025-09-05",
    id: "PRD005",
    email: "sophie@example.com",
    joined: "05 September 2025",
  },
  {
    name: "Daniel Lee",
    phone: "+61 467 890 123",
    location: "Melbourne, VIC",
    jobs: 7,
    status: "Active",
    created: "2026-02-01",
    id: "PRD006",
    email: "daniel@example.com",
    joined: "01 February 2026",
  },
  {
    name: "Olivia Martin",
    phone: "+61 478 901 234",
    location: "Sydney, NSW",
    jobs: 0,
    status: "Active",
    created: "2026-04-10",
    id: "PRD007",
    email: "olivia@example.com",
    joined: "10 April 2026",
  },
  {
    name: "Liam Taylor",
    phone: "+61 489 012 345",
    location: "Canberra, ACT",
    jobs: 9,
    status: "Blocked",
    created: "2025-08-22",
    id: "PRD008",
    email: "liam@example.com",
    joined: "22 August 2025",
  },
];

export default function UsersTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>All Users (8)</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Total Jobs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-zinc-900">
                  {user.name}
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-zinc-500">{user.location}</TableCell>
                <TableCell>{user.jobs}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "Active" ? "default" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-500">{user.created}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserDetailsDialog
                      name={user.name}
                      id={user.id}
                      email={user.email}
                      phone={user.phone}
                      joined={user.joined}
                      status={user.status as "Active" | "Blocked"}
                    />
                    <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100">
                      <Ban className="h-4 w-4" />
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
