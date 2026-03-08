"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema, ForgotPasswordFormData } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordThunk, selectAuth } from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store/store";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientText } from "@/components/ui/gradient-text";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector(selectAuth);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await dispatch(forgotPasswordThunk({ email: data.email })).unwrap();
      toast.success("Password reset link sent to your email");
      setSubmitted(true);
      reset();
    } catch (err) {
      toast.error((err as string) || "Failed to send reset email");
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">
            Check your email
          </h2>
          <p className="text-muted-foreground">
            We've sent a password reset link to your email. Click the link to
            create a new password.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or try with another
            email address.
          </p>
        </div>

        <div className="space-y-3">
          <GradientButton
            onClick={() => setSubmitted(false)}
            variant="outline"
            className="w-full"
            size="md"
          >
            Try another email
          </GradientButton>
          <Link href="/login">
            <GradientButton className="w-full" size="md">
              Back to login
            </GradientButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-foreground">Reset password</h2>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C4099]"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      <GradientButton
        type="submit"
        disabled={isLoading}
        className="w-full"
        size="md"
      >
        {isLoading ? "Sending link..." : "Send reset link"}
      </GradientButton>

      <Link
        href="/login"
        className="flex items-center gap-2 text-sm text-[#7C4099] hover:text-[#01A8A9] justify-center"
      >
        <ArrowLeft size={16} />
        Back to sign in
      </Link>
    </form>
  );
}
