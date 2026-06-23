"use client";

import { useEffect, useState } from "react";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useGetProfileSettingsQuery } from "@/redux/api/settingsApi";

export default function Topbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch settings profile in background to sync the Redux store
  const { isLoading: isProfileLoading } = useGetProfileSettingsQuery(undefined, {
    skip: !mounted,
  });

  const userName = currentUser?.name || "Admin User";
  const userEmail = currentUser?.email || "admin@example.com";
  const userImage = currentUser?.image || undefined;

  // Get initials for Avatar fallback
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || "AD";

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    router.push("/signin");
  };

  const showSkeleton = !mounted || isProfileLoading;

  return (
    <header className="flex flex-wrap items-center justify-end gap-4 rounded-2xl border border-zinc-200/70 bg-white px-5 py-2">
      <div className="flex items-center gap-4">
        <button className="relative rounded-full border border-zinc-200/70 bg-white p-2 text-zinc-500 shadow-sm">
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
          <Bell className="h-4 w-4" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {showSkeleton ? (
              <button disabled className="flex items-center gap-3 rounded-full border border-zinc-200/70 bg-white px-3 py-2 text-left shadow-sm opacity-80 cursor-not-allowed">
                <div className="h-8 w-8 rounded-full bg-zinc-200 animate-pulse" />
                <div className="hidden sm:block space-y-1">
                  <div className="h-3.5 w-20 rounded bg-zinc-200/80 animate-pulse" />
                  <div className="h-2.5 w-28 rounded bg-zinc-200/60 animate-pulse" />
                </div>
                <ChevronDown className="h-4 w-4 text-zinc-300 animate-pulse" />
              </button>
            ) : (
              <button className="flex items-center gap-3 rounded-full border border-zinc-200/70 bg-white px-3 py-2 text-left shadow-sm cursor-pointer">
                <Avatar className="h-8 w-8">
                  {userImage && <AvatarImage src={userImage} alt={userName} />}
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-zinc-900">
                    {userName}
                  </p>
                  <p className="text-[11px] text-zinc-500">{userEmail}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-zinc-500" />
              </button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-zinc-900">{userName}</p>
              <p className="text-xs text-zinc-500">{userEmail}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-rose-500 focus:text-rose-500 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

