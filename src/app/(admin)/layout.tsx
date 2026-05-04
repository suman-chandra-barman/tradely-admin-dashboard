import MobileNav from "@/components/layout/MobileNav";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff8ee,_#f6f7fb_35%,_#eef1f7_100%)]">
      <Sidebar />
      <div className="lg:pl-60">
        <div className="mx-auto flex min-h-screen w-full max-w-350 flex-col gap-6 px-4 pb-6">
          <MobileNav />
          <div className="sticky top-0 z-30">
            <Topbar />
          </div>
          <main className="flex-1 space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
