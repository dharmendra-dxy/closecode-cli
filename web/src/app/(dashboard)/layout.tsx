"use client";

import { authClient } from "@/lib/auth-client";
import { MAIN_ROUTE } from "@/lib/ui-route";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = authClient.useSession();
  const isUnauthenticated = !isPending && (!data?.session || !data?.user);
  const router = useRouter();

  useEffect(() => {
    if (isUnauthenticated) router.replace(MAIN_ROUTE.base);
  }, [isUnauthenticated, router]);

  return <div className="flex flex-1 flex-col">{children}</div>;
};

export default Layout;
