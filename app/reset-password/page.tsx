import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
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
  title: "Reset Password - Amirni Admin",
  description: "Create a new password for your Amirni Admin account",
};

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center space-y-3">
          <h1 className="text-4xl font-bold">
            <GradientText>Amirni Admin</GradientText>
          </h1>
        </div>

        <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
          <Suspense
            fallback={
              <div className="h-48 flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
