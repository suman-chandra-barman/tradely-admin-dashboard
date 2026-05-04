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

const rows = [
  {
    type: "New User",
    name: "Sarah Johnson",
    detail: "Melbourne, VIC",
    time: "2 mins ago",
    status: "New",
    variant: "info",
  },
  {
    type: "New Job",
    name: "Plumbing Repair",
    detail: "Posted by Mike Chen",
    time: "15 mins ago",
    status: "New Job",
    variant: "warning",
  },
  {
    type: "Job Completed",
    name: "Kitchen Renovation",
    detail: "By Alex Builder",
    time: "1 hour ago",
    status: "Completed",
    variant: "default",
  },
  {
    type: "New User",
    name: "James Wilson",
    detail: "Sydney, NSW",
    time: "2 hours ago",
    status: "New",
    variant: "info",
  },
  {
    type: "New Tradie",
    name: "Emma Electrician",
    detail: "Brisbane, QLD",
    time: "3 hours ago",
    status: "New Tradie",
    variant: "secondary",
  },
];

export default function RecentActivityTable() {
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
            {rows.map((row) => (
              <TableRow key={`${row.type}-${row.name}`}>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell className="text-zinc-500">{row.detail}</TableCell>
                <TableCell className="text-zinc-500">{row.time}</TableCell>
                <TableCell>
                  <Badge variant={row.variant as never}>{row.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
