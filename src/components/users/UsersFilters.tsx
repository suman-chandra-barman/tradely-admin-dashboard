"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "all";

  const [status, setStatus] = useState(currentStatus);
  const [search, setSearch] = useState(currentSearch);

  // Sync status immediately
  const handleStatusChange = (value: string) => {
    setStatus(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Sync search input after 400ms debouncing
  useEffect(() => {
    if (search === (searchParams.get("search") || "")) {
      return;
    }

    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [search, pathname, router, searchParams]);

  // Handle browser back/forward or direct URL change synchronization
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setStatus(searchParams.get("status") || "all");
  }, [searchParams]);

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm">
      <div className="flex-1">
        <Input
          placeholder="Search by name or phone..."
          className="h-11"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-45">
        <Select value={status} onValueChange={handleStatusChange}>
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
