import { Briefcase, LayoutGrid, UserRound, CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/card";

const stats = [
  {
    label: "Total Users",
    value: "2,847",
    icon: UserRound,
    tone: "bg-blue-100 text-blue-600",
  },
  {
    label: "Total Tradies",
    value: "1,234",
    icon: Briefcase,
    tone: "bg-amber-100 text-amber-700",
  },
  {
    label: "Active Jobs",
    value: "456",
    icon: LayoutGrid,
    tone: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Completed Jobs",
    value: "8,921",
    icon: CheckCircle2,
    tone: "bg-indigo-100 text-indigo-600",
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
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
