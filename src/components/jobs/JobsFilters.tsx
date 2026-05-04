"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JobsFilters() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm">
      <div className="flex-1">
        <Input
          placeholder="Search by job title or customer..."
          className="h-11"
        />
      </div>
      <div className="w-full sm:w-[180px]">
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="progress">In Progress</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="matched">Matched</SelectItem>
            <SelectItem value="posted">Posted</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
