"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersFilters() {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm">
      <div className="flex-1">
        <Input placeholder="Search by name or phone..." className="h-11" />
      </div>
      <div className="w-full sm:w-[180px]">
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
