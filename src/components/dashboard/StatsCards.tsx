"use client";

import { Briefcase, LayoutGrid, UserRound, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";

export default function StatsCards() {
  const { data: response, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="flex items-center justify-between p-5">
            <div>
              <div className="h-4 w-20 bg-zinc-200 rounded animate-pulse" />
              <div className="mt-3 h-6 w-16 bg-zinc-200 rounded animate-pulse" />
            </div>
            <div className="h-11 w-11 rounded-2xl bg-zinc-200 animate-pulse" />
          </Card>
        ))}
      </div>
    );
  }

  const data = response?.data || {
    total_users: 0,
    total_tradies: 0,
    active_jobs: 0,
    completed_jobs: 0,
  };

  const cards = [
    {
      label: "Total Users",
      value: data.total_users?.toLocaleString() ?? "0",
      icon: UserRound,
      tone: "bg-blue-100 text-blue-600",
    },
    {
      label: "Total Tradies",
      value: data.total_tradies?.toLocaleString() ?? "0",
      icon: Briefcase,
      tone: "bg-amber-100 text-amber-700",
    },
    {
      label: "Active Jobs",
      value: data.active_jobs?.toLocaleString() ?? "0",
      icon: LayoutGrid,
      tone: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Completed Jobs",
      value: data.completed_jobs?.toLocaleString() ?? "0",
      icon: CheckCircle2,
      tone: "bg-indigo-100 text-indigo-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <Card
          key={item.label}
          className="flex items-center justify-between p-5"
        >
          <div>
            <p className="text-sm text-zinc-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-zinc-900">
              {item.value}
            </p>
          </div>
          <div className={`rounded-2xl p-3 ${item.tone}`}>
            <item.icon className="h-5 w-5" />
          </div>
        </Card>
      ))}
    </div>
  );
}
