import JobsFilters from "@/components/jobs/JobsFilters";
import JobsTable from "@/components/jobs/JobsTable";

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Jobs</h1>
        <p className="text-sm text-zinc-500">
          Track job lifecycle and handle customer requests.
        </p>
      </div>
      <JobsFilters />
      <JobsTable />
    </div>
  );
}
