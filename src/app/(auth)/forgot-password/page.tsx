/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { validateEmail } from "@/schemas/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError);
      return;
    }
    try {
      const response = await forgotPassword({ email_address: email.trim() }).unwrap();

      if (response?.success) {
        localStorage.setItem("forgotEmail", email.trim());
        toast.success(response?.message || "OTP sent successfully.");
        router.push("/forgot-password-verify");
        return;
      }

      toast.error(response?.message || "Failed to send OTP.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-auth-bg p-6">
      <div className="flex flex-col items-center">
        {/* Back link */}
        <div className="w-full max-w-[440px] mb-4 flex">
          <Link href="/signin" className="inline-flex items-center gap-2 text-sm font-medium text-auth-text-secondary no-underline transition-colors duration-200 hover:text-auth-text-primary">
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
        </div>

        {/* Card */}
        <div className="w-full max-w-[440px] bg-auth-card-bg border border-auth-card-border rounded-3xl py-10 px-8 shadow-sm flex flex-col">
          {/* Badge circle with padlock */}
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-brand-primary text-white mx-auto mb-6 shadow-md shadow-brand-primary/20">
            <Lock className="w-6 h-6 stroke-[2px]" />
          </div>

          {/* Header */}
          <div className="text-center mb-7">
            <h1 className="text-2xl font-bold text-auth-text-primary tracking-tight mb-2">Forgot Password</h1>
            <p className="text-sm text-auth-text-secondary leading-relaxed">Type your email to reset your password.</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Email field group */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-auth-text-primary">
                Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-auth-input-placeholder pointer-events-none w-4 h-4" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full bg-auth-input-bg border border-transparent rounded-xl py-3 pl-11 pr-4 text-sm text-auth-input-text placeholder-auth-input-placeholder outline-none transition-all duration-200 focus:border-brand-primary focus:bg-auth-card-bg focus:ring-4 focus:ring-brand-primary-light"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full py-3 bg-brand-primary hover:bg-brand-primary-hover active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold border-none cursor-pointer transition-all duration-200"
            >
              {isLoading ? "Sending…" : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
