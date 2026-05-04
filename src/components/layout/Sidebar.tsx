"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Briefcase,
  Hammer,
  Settings,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutGrid },
  { name: "Users", href: "/users", icon: Users },
  { name: "Tradies", href: "/tradies", icon: Briefcase },
  { name: "Jobs", href: "/jobs", icon: Hammer },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-60 flex-col justify-between border-r border-zinc-200/70 bg-white px-4 py-6 shadow-sm lg:flex">
      <div className="space-y-10">
        <div className="px-3 text-lg font-semibold text-blue-700">
          ADMIN PANEL
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 transition",
                  active
                    ? "bg-amber-500 text-white shadow"
                    : "hover:bg-zinc-100",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <button className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-100">
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </aside>
  );
}
