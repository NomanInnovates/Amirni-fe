import { LoginForm } from "@/features/auth/components/login-form";
import { GradientText } from "@/components/ui/gradient-text";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#7C4099",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#7C4099] to-[#01A8A9] items-center justify-center p-8">
        <div className="text-center text-white space-y-8">
          <div>
            <h1 className="text-5xl font-bold mb-4">Amirni Admin</h1>
            <p className="text-xl opacity-90">Enterprise Dashboard Platform</p>
          </div>
          <div className="space-y-4 text-sm opacity-75">
            <p>✓ Advanced KYC Management</p>
            <p>✓ Real-time Logistics Tracking</p>
            <p>✓ Marketplace Administration</p>
            <p>✓ Role-based Access Control</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <LoginForm />

          <div className="text-center text-xs text-muted-foreground space-y-2">
            <p>
              By signing in, you agree to our{" "}
              <a href="#" className="text-[#7C4099] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#7C4099] hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
