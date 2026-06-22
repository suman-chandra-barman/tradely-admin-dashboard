/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { validateResetPassword } from "@/schemas/auth";

const passwordRules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

function getStrength(password: string) {
  const passed = passwordRules.filter((r) => r.test(password)).length;
  if (passed === 0) return { level: 0, label: "", color: "" };
  if (passed === 1) return { level: 1, label: "Weak", color: "#C0392B" };
  if (passed === 2) return { level: 2, label: "Fair", color: "#e67e22" };
  if (passed === 3) return { level: 3, label: "Good", color: "#f1c40f" };
  return { level: 4, label: "Strong", color: "#27ae60" };
}

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const strength = getStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateResetPassword({
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const resetToken = typeof window !== "undefined" ? localStorage.getItem("resetToken") || "" : "";
    if (!resetToken) {
      toast.error("Reset token is missing or has expired. Please try again.");
      router.push("/forgot-password");
      return;
    }

    try {
      const response = await resetPassword({
        reset_token: resetToken,
        new_password: newPassword,
      }).unwrap();

      if (response?.success) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("resetToken");
          localStorage.removeItem("forgotEmail");
        }
        toast.success(response?.message || "Password reset successfully. Please sign in with your new password.");
        router.push("/signin");
        return;
      }

      toast.error(response?.message || "Password reset failed.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Password reset failed.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-auth-bg p-6">
      <div className="w-full max-w-[440px] bg-auth-card-bg border border-auth-card-border rounded-3xl py-10 px-8 shadow-sm flex flex-col">
        {/* Badge circle with padlock */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-primary text-white mx-auto mb-6 shadow-md shadow-brand-primary/20">
          <Lock className="w-6 h-6 stroke-[2px]" />
        </div>

        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold text-auth-text-primary tracking-tight mb-2">Reset Password</h1>
          <p className="text-sm text-auth-text-secondary leading-relaxed">Enter your new password</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="new-password" className="text-sm font-semibold text-auth-text-primary">
              New password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-auth-input-placeholder pointer-events-none w-4 h-4" />
              <input
                id="new-password"
                type={showNew ? "text" : "password"}
                placeholder="New password"
                className="w-full bg-auth-input-bg border border-transparent rounded-xl py-3 pl-11 pr-11 text-sm text-auth-input-text placeholder-auth-input-placeholder outline-none transition-all duration-200 focus:border-brand-primary focus:bg-auth-card-bg focus:ring-4 focus:ring-brand-primary-light"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute right-4 text-auth-input-placeholder cursor-pointer bg-none border-none p-0 flex items-center justify-center transition-colors duration-200 hover:text-auth-text-primary"
                aria-label={showNew ? "Hide password" : "Show password"}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength bar */}
            {newPassword.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1.5">
                  {[1, 2, 3, 4].map((seg) => (
                    <div
                      key={seg}
                      className="h-1 flex-1 rounded-full bg-zinc-200 transition-all duration-300"
                      style={{
                        backgroundColor:
                          seg <= strength.level ? strength.color : undefined,
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs font-semibold" style={{ color: strength.color }}>
                  {strength.label}
                </p>
              </div>
            )}

            {/* Rules checklist */}
            {newPassword.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1">
                {passwordRules.map(({ label, test }) => {
                  const ok = test(newPassword);
                  return (
                    <li key={label} className="flex items-center gap-1.5 text-xs">
                      {ok ? (
                        <CheckCircle2 size={13} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <XCircle size={13} className="text-gray-300 flex-shrink-0" />
                      )}
                      <span
                        className={ok ? "text-auth-text-primary" : "text-auth-input-placeholder"}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-auth-input-placeholder pointer-events-none w-4 h-4" />
              <input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Retype password"
                className="w-full bg-auth-input-bg border border-transparent rounded-xl py-3 pl-11 pr-11 text-sm text-auth-input-text placeholder-auth-input-placeholder outline-none transition-all duration-200 focus:border-brand-primary focus:bg-auth-card-bg focus:ring-4 focus:ring-brand-primary-light"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-4 text-auth-input-placeholder cursor-pointer bg-none border-none p-0 flex items-center justify-center transition-colors duration-200 hover:text-auth-text-primary"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-3 bg-brand-primary hover:bg-brand-primary-hover active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold border-none cursor-pointer transition-all duration-200"
          >
            {isLoading ? "Resetting…" : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
}
