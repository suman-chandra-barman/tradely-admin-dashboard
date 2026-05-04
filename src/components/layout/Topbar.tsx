"use client";

import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Topbar() {
  return (
    <header className="flex flex-wrap items-center justify-end gap-4 rounded-2xl border border-zinc-200/70 bg-white px-5 py-2">
      <div className="flex items-center gap-4">
        <button className="relative rounded-full border border-zinc-200/70 bg-white p-2 text-zinc-500 shadow-sm">
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
          <Bell className="h-4 w-4" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-full border border-zinc-200/70 bg-white px-3 py-2 text-left shadow-sm">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="https://i.pravatar.cc/100?img=12"
                  alt="Admin"
                />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-zinc-900">
                  Admin Angela
                </p>
                <p className="text-[11px] text-zinc-500">admin@gmail.com</p>
              </div>
              <ChevronDown className="h-4 w-4 text-zinc-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-zinc-900">Admin</p>
              <p className="text-xs text-zinc-500">admin@gmail.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-rose-500 focus:text-rose-500">
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
