"use client";

import Link from "next/link";
import { GradientText } from "@/components/ui/gradient-text";
import { GradientButton } from "@/components/ui/gradient-button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <h1
          className="text-9xl font-bold bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(124, 64, 153, 1) 15%, rgba(1, 168, 169, 1) 100%)",
          }}
        >
          404
        </h1>
        <h2 className="text-2xl font-bold text-foreground">
          Page <GradientText>Not Found</GradientText>
        </h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/">
            <GradientButton size="lg">Go Home</GradientButton>
          </Link>
          <Link href="/dashboard">
            <GradientButton variant="outline" size="lg">
              Dashboard
            </GradientButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
