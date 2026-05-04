"use client";

import { Eye, KeyRound, Trash2 } from "lucide-react";

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

const tradies = [
  {
    name: "Alex Builder",
    skills: "Carpentry, Renovation",
    area: "Melbourne Metro",
    rating: 4.8,
    jobs: 47,
    status: "Active",
  },
  {
    name: "Emma Electrician",
    skills: "Electrical, Solar",
    area: "Brisbane North",
    rating: 4.9,
    jobs: 89,
    status: "Active",
  },
  {
    name: "Tom Plumber",
    skills: "Plumbing, Gas Fitting",
    area: "Sydney CBD",
    rating: 4.7,
    jobs: 62,
    status: "Active",
  },
  {
    name: "Lisa Painter",
    skills: "Painting, Decorating",
    area: "Perth Metro",
    rating: 4.6,
    jobs: 34,
    status: "Suspended",
  },
  {
    name: "Chris Tiler",
    skills: "Tiling, Bathroom Reno",
    area: "Adelaide Hills",
    rating: 4.9,
    jobs: 71,
    status: "Active",
  },
  {
    name: "Rachel Roofer",
    skills: "Roofing, Guttering",
    area: "Melbourne West",
    rating: 4.5,
    jobs: 28,
    status: "Active",
  },
  {
    name: "Mark Mason",
    skills: "Bricklaying, Paving",
    area: "Sydney Metro",
    rating: 4.8,
    jobs: 55,
    status: "Active",
  },
  {
    name: "Jessica HVAC",
    skills: "Air Conditioning, Heating",
    area: "Brisbane South",
    rating: 4.7,
    jobs: 43,
    status: "Suspended",
  },
];

const pendingRequests = [
  {
    name: "Alex Builder",
    skills: "Carpentry, Renovation",
    area: "Melbourne Metro",
    transaction: "1234567890123",
  },
  {
    name: "Emma Electrician",
    skills: "Electrical, Solar",
    area: "Brisbane North",
    transaction: "1234567890123",
  },
  {
    name: "Tom Plumber",
    skills: "Plumbing, Gas Fitting",
    area: "Sydney CBD",
    transaction: "1234567890123",
  },
  {
    name: "Lisa Painter",
    skills: "Painting, Decorating",
    area: "Perth Metro",
    transaction: "1234567890123",
  },
  {
    name: "Chris Tiler",
    skills: "Tiling, Bathroom Reno",
    area: "Adelaide Hills",
    transaction: "1234567890123",
  },
  {
    name: "Rachel Roofer",
    skills: "Roofing, Guttering",
    area: "Melbourne West",
    transaction: "1234567890123",
  },
  {
    name: "Mark Mason",
    skills: "Bricklaying, Paving",
    area: "Sydney Metro",
    transaction: "1234567890123",
  },
  {
    name: "Jessica HVAC",
    skills: "Air Conditioning, Heating",
    area: "Brisbane South",
    transaction: "1234567890123",
  },
];

export default function TradiesTabs() {
  return (
    <Tabs defaultValue="tradies">
      <TabsList>
        <TabsTrigger value="tradies">Tradies</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
      </TabsList>

      <TabsContent value="tradies">
        <Card>
          <CardHeader className="mb-4">
            <CardTitle>All Tradies</CardTitle>
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
                {tradies.map((tradie) => (
                  <TableRow key={tradie.name}>
                    <TableCell className="font-medium text-zinc-900">
                      {tradie.name}
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {tradie.skills}
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {tradie.area}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-amber-500">★</span>
                      <span className="ml-1 text-zinc-700">
                        {tradie.rating}
                      </span>
                    </TableCell>
                    <TableCell>{tradie.jobs}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tradie.status === "Active" ? "default" : "warning"
                        }
                      >
                        {tradie.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded-full p-2 text-amber-600 hover:bg-amber-50">
                          <KeyRound className="h-4 w-4" />
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
      </TabsContent>

      <TabsContent value="pending">
        <Card>
          <CardHeader>
            <CardTitle>Tradies Pending Request</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Service Area</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((request) => (
                  <TableRow key={request.name}>
                    <TableCell className="font-medium text-zinc-900">
                      {request.name}
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {request.skills}
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {request.area}
                    </TableCell>
                    <TableCell>
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600">
                        {request.transaction}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="destructive">
                          Reject
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
