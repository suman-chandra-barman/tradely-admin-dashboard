/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useLoginMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { validateEmail } from "@/schemas/auth";
import { useAppDispatch } from "@/redux/hooks";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError);
      return;
    }
    try {
      const response = await login({
        email: email.trim(),
        password,
      }).unwrap();

      if (response?.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            tokens: response.data.tokens,
          }),
        );
        toast.success(response?.message || "Signed in successfully.");
        router.push("/");
        return;
      }

      toast.error(response?.message || "Login failed.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed.");
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
          <h1 className="text-2xl font-bold text-auth-text-primary tracking-tight mb-2">Admin Login</h1>
          <p className="text-sm text-auth-text-secondary leading-relaxed">Sign in to access the dashboard</p>
        </div>

        {/* Form */}
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

          {/* Password field group */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-semibold text-auth-text-primary">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 text-auth-input-placeholder pointer-events-none w-4 h-4" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-auth-input-bg border border-transparent rounded-xl py-3 pl-11 pr-11 text-sm text-auth-input-text placeholder-auth-input-placeholder outline-none transition-all duration-200 focus:border-brand-primary focus:bg-auth-card-bg focus:ring-4 focus:ring-brand-primary-light"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 text-auth-input-placeholder cursor-pointer bg-none border-none p-0 flex items-center justify-center transition-colors duration-200 hover:text-auth-text-primary"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Forgot link */}
          <div className="flex justify-end -mt-1">
            <Link href="/forgot-password" className="text-xs font-semibold text-brand-primary no-underline transition-opacity duration-200 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-3 bg-brand-primary hover:bg-brand-primary-hover active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold border-none cursor-pointer transition-all duration-200"
          >
            {isLoading ? "Signing in…" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
