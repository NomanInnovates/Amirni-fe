"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormData } from "../schemas";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, selectAuth } from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store/store";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientText } from "@/components/ui/gradient-text";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector(selectAuth);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      // rememberMe: false,
    },
  } as any);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(
        loginThunk({ email: data.email, password: data.password }),
      ).unwrap();
      toast.success("Login successful!");
      reset();
      router.push("/dashboard");
    } catch (err) {
      toast.error((err as string) || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Password</label>
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

      <div className="flex items-center justify-between">
        {/* <label className="flex items-center gap-2">
          <input
            {...register("rememberMe")}
            type="checkbox"
            className="w-4 h-4 rounded border-input"
            disabled={isLoading}
          />
          <span className="text-sm text-foreground">Remember me</span>
        </label> */}
        <a
          href="/forgot-password"
          className="text-sm font-medium text-[#7C4099] hover:text-[#01A8A9]"
        >
          Forgot password?
        </a>
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
        {isLoading ? "Signing in..." : "Sign In"}
      </GradientButton>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <a href="/register" className="font-medium">
          <GradientText>Sign up</GradientText>
        </a>
      </p>
    </form>
  );
}
