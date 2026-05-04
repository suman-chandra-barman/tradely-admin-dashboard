import JobsOverTimeChart from "@/components/dashboard/JobsOverTimeChart";
import RecentActivityTable from "@/components/dashboard/RecentActivityTable";
import StatsCards from "@/components/dashboard/StatsCards";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-500">
          Monitor overall platform health and new activity.
        </p>
      </div>
      <StatsCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <JobsOverTimeChart />
        <UserGrowthChart />
      </div>
      <RecentActivityTable />
    </div>
  );
}
