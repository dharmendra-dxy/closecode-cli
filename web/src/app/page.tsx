"use client";

import { MAIN_ROUTE } from "@/lib/ui-route";

import { DashboardSkeleton } from "@/components/shared/skeleton/dashbaord-skeleton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingPage from "@/components/landing-page/landing-page";

export default function Home() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const isAuthenticated = Boolean(data?.session || data?.user);

  useEffect(() => {
    if (!isPending && isAuthenticated) router.replace(MAIN_ROUTE.dashboard);
  }, [isPending, isAuthenticated, router]);

  if (isPending || isAuthenticated) return <DashboardSkeleton />;

  return <LandingPage />;
}
