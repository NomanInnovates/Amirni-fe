import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { GradientText } from "@/components/ui/gradient-text";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#7C4099",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata = {
  title: "Forgot Password - Amirni Admin",
  description: "Reset your password to regain access to your account",
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center space-y-3">
          <h1 className="text-4xl font-bold">
            <GradientText>Amirni Admin</GradientText>
          </h1>
          <p className="text-muted-foreground">
            Reset your password to regain access
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
          <ForgotPasswordForm />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Remember your password?{" "}
          <a href="/login" className="font-medium">
            <GradientText>Sign in</GradientText>
          </a>
        </p>
      </div>
    </main>
  );
}
