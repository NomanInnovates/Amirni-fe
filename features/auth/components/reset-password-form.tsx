"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema, ResetPasswordFormData } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk, selectAuth } from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store/store";
import { GradientButton } from "@/components/ui/gradient-button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface ResetPasswordFormProps {
  token?: string;
}

export function ResetPasswordForm({
  token: initialToken,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector(selectAuth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = initialToken || searchParams.get("token") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      token,
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await dispatch(
        resetPasswordThunk({ token: data.token, password: data.password }),
      ).unwrap();
      toast.success("Password reset successfully!");
      reset();
      router.push("/login");
    } catch (err) {
      toast.error((err as string) || "Failed to reset password");
    }
  };

  if (!token) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-destructive">Invalid Link</h2>
          <p className="text-muted-foreground">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
        </div>
        <GradientButton
          onClick={() => router.push("/forgot-password")}
          className="w-full"
        >
          Request new link
        </GradientButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-foreground">
          Create new password
        </h2>
        <p className="text-muted-foreground">
          Enter a new password for your account.
        </p>
      </div>

      <input {...register("token")} type="hidden" />

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          New Password
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C4099]"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Confirm Password
        </label>
        <div className="relative">
          <input
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C4099]"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">
            {errors.confirmPassword.message}
          </p>
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
        {isLoading ? "Resetting password..." : "Reset password"}
      </GradientButton>
    </form>
  );
}
