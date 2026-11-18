"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ShieldAlert, ShieldCheck } from "lucide-react";

import { DashboardSkeleton } from "@/components/shared/skeleton/dashbaord-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { MAIN_ROUTE } from "@/lib/ui-route";

function getInitials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.split("@")[0] || "User";

  return source
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(value: Date | string) {
  return new Date(value).toLocaleString();
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-all text-right text-foreground">{value}</dd>
    </div>
  );
}

const DashboardPage = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignOut() {
    setError(null);
    setIsSigningOut(true);

    const { error: signOutError } = await authClient.signOut();

    if (signOutError) {
      setError(signOutError.message ?? "Unable to log out. Please try again.");
      setIsSigningOut(false);
      return;
    }

    router.replace(MAIN_ROUTE.base);
    router.refresh();
  }

  if (isPending) return <DashboardSkeleton />;

  if (!data?.session || !data?.user) return null;

  const { session, user } = data;

  return (
    <div className="flex w-full flex-1 items-start justify-center p-4 md:p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Session details</CardTitle>
          <CardDescription>
            You are signed in to CloseCode. Here is the current session
            information.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              {user.image && <AvatarImage src={user.image} alt={user.name} />}
              <AvatarFallback>{getInitials(user.name, user.email)}</AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>

            <Badge variant={user.emailVerified ? "secondary" : "outline"}>
              {user.emailVerified ? <ShieldCheck /> : <ShieldAlert />}
              {user.emailVerified ? "Verified" : "Unverified"}
            </Badge>
          </div>

          <Separator />

          <dl className="flex flex-col gap-2 text-sm">
            <DetailRow label="User ID" value={user.id} />
            <DetailRow label="Session ID" value={session.id} />
            <DetailRow label="Signed in" value={formatDate(session.createdAt)} />
            <DetailRow label="Expires" value={formatDate(session.expiresAt)} />
            <DetailRow
              label="IP address"
              value={session.ipAddress || "Unknown"}
            />
            <DetailRow
              label="Device"
              value={session.userAgent || "Unknown"}
            />
          </dl>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>

        <CardFooter>
          <Button
            variant="destructive"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full"
          >
            {isSigningOut ? (
              <>
                Logging out
                <Spinner data-icon="inline-end" />
              </>
            ) : (
              <>
                Log out
                <LogOut data-icon="inline-end" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardPage;
