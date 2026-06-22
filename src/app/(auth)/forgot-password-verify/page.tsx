/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import {
  useVerifyForgotPasswordOtpMutation,
  useResendForgotPasswordOtpMutation,
} from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";
import { validateVerifyForgotPasswordOtp } from "@/schemas/auth";

export default function ForgotPasswordVerifyPage() {
  const [email] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("forgotEmail") || "";
  });
  const otpLength = 6;
  const [otp, setOtp] = useState<string[]>(
    Array.from({ length: otpLength }, () => ""),
  );
  const [timeLeft, setTimeLeft] = useState(59);
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verifyForgotPasswordOtp, { isLoading }] =
    useVerifyForgotPasswordOtpMutation();
  const [resendForgotPasswordOtp, { isLoading: isResending }] =
    useResendForgotPasswordOtpMutation();

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleResend = async () => {
    if (!email) {
      toast.error("Email address is missing.");
      return;
    }
    try {
      const response = await resendForgotPasswordOtp({
        email: email.trim(),
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Verification code resent successfully.");
        setTimeLeft(59); // Reset the countdown timer
      } else {
        toast.error(response?.message || "Failed to resend code.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to resend code.");
    }
  };

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otpLength - 1) {
        const next = document.getElementById(`otp-${index + 1}`);
        if (next) (next as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      if (prev) (prev as HTMLInputElement).focus();
    }
  };

  const handlePaste = (index: number, value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, otpLength - index);
    if (!digits) return;

    const newOtp = [...otp];
    digits.split("").forEach((char, offset) => {
      newOtp[index + offset] = char;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(index + digits.length, otpLength - 1);
    const next = document.getElementById(`otp-${nextIndex}`);
    if (next) (next as HTMLInputElement).focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    const validationError = validateVerifyForgotPasswordOtp({
      email: email,
      code: otpValue,
    });
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      const response = await verifyForgotPasswordOtp({
        email: email,
        code: otpValue,
      }).unwrap();

      if (response?.success) {
        localStorage.setItem("resetToken", response.data.reset_token);
        toast.success(response?.message || "OTP verified successfully.");
        router.push("/reset-password");
        return;
      }

      toast.error(response?.message || "Verification failed.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Verification failed.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-auth-bg p-6">
      <div className="flex flex-col items-center">
        {/* Back link */}
        <div className="w-full max-w-[440px] mb-4 flex">
          <Link href="/forgot-password" className="inline-flex items-center gap-2 text-sm font-medium text-auth-text-secondary no-underline transition-colors duration-200 hover:text-auth-text-primary">
            <ArrowLeft size={16} />
            Back
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
            <h1 className="text-2xl font-bold text-auth-text-primary tracking-tight mb-2">Verify Email</h1>
            <p className="text-sm text-auth-text-secondary leading-relaxed">Type the OTP to reset your password</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* OTP inputs */}
            <div className="flex gap-2 justify-center my-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={(e) => {
                    e.preventDefault();
                    handlePaste(idx, e.clipboardData.getData("text"));
                  }}
                  className={`w-11 h-12 text-center text-lg font-semibold border rounded-xl bg-auth-input-bg text-auth-input-text outline-none transition-all duration-200 focus:border-[#0d2f2c] focus:bg-auth-card-bg focus:ring-4 focus:ring-[#0d2f2c]/10 ${
                    digit ? "border-[#0d2f2c]" : "border-auth-card-border"
                  }`}
                />
              ))}
            </div>

            {/* Resend and Countdown section */}
            <div className="flex justify-center mb-2 text-sm text-auth-text-secondary">
              {timeLeft > 0 ? (
                <span className="text-sm text-auth-text-secondary">
                  Don’t get the code? Resend ({timeLeft}s)
                </span>
              ) : (
                <span>
                  Don’t get the code?
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="font-semibold text-brand-primary no-underline bg-none border-none p-0 cursor-pointer ml-1 hover:underline"
                  >
                    {isResending ? "Resending..." : "Resend"}
                  </button>
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 w-full py-3 bg-brand-primary hover:bg-brand-primary-hover active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold border-none cursor-pointer transition-all duration-200"
            >
              {isLoading ? "Verifying…" : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
