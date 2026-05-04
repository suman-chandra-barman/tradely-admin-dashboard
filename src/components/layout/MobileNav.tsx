"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Users, Briefcase, Hammer, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutGrid },
  { name: "Users", href: "/users", icon: Users },
  { name: "Tradies", href: "/tradies", icon: Briefcase },
  { name: "Jobs", href: "/jobs", icon: Hammer },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-zinc-200/70 bg-white p-2 shadow-sm lg:hidden">
      {navigation.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold",
              active
                ? "bg-amber-500 text-white"
                : "text-zinc-600 hover:bg-zinc-100",
            )}
          >
            <item.icon className="h-3.5 w-3.5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
