"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogOut } from "lucide-react";

interface LogoutConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmation({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmationProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px] p-6 gap-6 rounded-2xl border border-zinc-100 bg-white">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <LogOut className="h-6 w-6" />
          </div>
          
          <DialogHeader className="gap-2">
            <DialogTitle className="text-xl font-semibold text-zinc-900 text-center">
              Confirm Logout
            </DialogTitle>
            <DialogDescription className="text-zinc-500 text-sm text-center">
              Are you sure you want to log out of your account? You will need to sign in again to access the dashboard.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end mt-5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 active:bg-zinc-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 justify-center rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 active:bg-rose-800 cursor-pointer"
          >
            Yes, Log out
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
