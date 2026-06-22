import { Suspense } from "react";
import UsersFilters from "@/components/users/UsersFilters";
import UsersTable from "@/components/users/UsersTable";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Users</h1>
        <p className="text-sm text-zinc-500">
          Track user onboarding and manage account status.
        </p>
      </div>
      <Suspense fallback={<div className="h-40 w-full animate-pulse rounded-2xl bg-zinc-100" />}>
        <UsersFilters />
        <UsersTable />
      </Suspense>
    </div>
  );
}
