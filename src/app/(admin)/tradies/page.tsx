import TradiesFilters from "@/components/tradies/TradiesFilters";
import TradiesTabs from "@/components/tradies/TradiesTabs";

export default function TradiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Tradies</h1>
        <p className="text-sm text-zinc-500">
          Manage trade professionals and onboarding requests.
        </p>
      </div>
      <TradiesFilters />
      <TradiesTabs />
    </div>
  );
}
