"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Braces,
  CheckCircle2,
  KeyRound,
  Laptop,
  LogIn,
  ShieldCheck,
  Terminal,
  UserPlus,
  XCircle,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { AUTH_ROUTE, MAIN_ROUTE } from "@/lib/ui-route";
import DeviceCardSkeleton from "@/components/shared/skeleton/device-card-skeleton";
import {
  normalizeUserCode,
  formatUserCode,
  getInitials,
  parseScopes,
  getDeviceErrorMessage,
  getStoredDecision,
  storeDecision,
} from "@/utils/device";
import { USER_CODE_LENGTH } from "@/constants/device";
import { DeviceStep, DeviceVerificationData } from "@/types/device";

function DeviceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-muted)_0%,transparent_60%)] opacity-70"
      />

      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <Link href={MAIN_ROUTE.base} className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Braces className="size-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-semibold tracking-tight">
              CloseCode
            </span>
            <span className="mt-1 text-[11px] text-muted-foreground">
              CLI Device Authorization
            </span>
          </span>
        </Link>

        <Badge variant="outline" className="gap-1.5 px-2.5 py-1 text-xs">
          <Terminal className="size-3" />
          Device Flow
        </Badge>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">{children}</div>
      </main>

      <footer className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} CloseCode</span>
        <span>OAuth 2.0 Device Authorization Grant</span>
      </footer>
    </div>
  );
}

function DeviceAuthorizationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCode = normalizeUserCode(searchParams.get("user_code") ?? "");

  const { data: sessionData, isPending: isSessionPending } =
    authClient.useSession();

  const [code, setCode] = useState<string>(initialCode);
  const [step, setStep] = useState<DeviceStep>("enter-code");
  const [verification, setVerification] =
    useState<DeviceVerificationData | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmittingDecision, setIsSubmittingDecision] = useState<
    "approve" | "deny" | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const autoVerifiedCodeRef = useRef<string | null>(null);

  const isAuthenticated = Boolean(sessionData?.session && sessionData?.user);

  const verifyCode = useCallback(async (rawCode: string) => {
    const normalized = normalizeUserCode(rawCode);
    if (normalized.length < USER_CODE_LENGTH) {
      setError(`Please enter all ${USER_CODE_LENGTH} characters of your code.`);
      return;
    }

    const cached = getStoredDecision(normalized);
    if (
      cached &&
      (cached.status === "approved" || cached.status === "denied")
    ) {
      setError(null);
      setVerification(cached);
      setStep(cached.status);
      return;
    }

    setError(null);
    setIsVerifying(true);

    try {
      const { data, error: verifyError } = await authClient.device({
        query: { user_code: normalized },
      });

      if (verifyError || !data) {
        setError(
          getDeviceErrorMessage(
            verifyError,
            "Invalid or expired device code. Please check your terminal and try again.",
          ),
        );
        setStep("enter-code");
        return;
      }

      const payload = data as DeviceVerificationData;
      setVerification(payload);

      if (payload.status === "approved") {
        storeDecision(payload);
        setStep("approved");
      } else if (payload.status === "denied") {
        storeDecision(payload);
        setStep("denied");
      } else if (!payload.client_id) {
        setError(
          "This device code is already associated with a different account.",
        );
        setStep("enter-code");
      } else {
        setStep("review");
      }
    } catch {
      setError("Unable to reach the authentication server. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  }, []);

  useEffect(() => {
    if (
      isAuthenticated &&
      initialCode.length === USER_CODE_LENGTH &&
      autoVerifiedCodeRef.current !== initialCode
    ) {
      autoVerifiedCodeRef.current = initialCode;
      void verifyCode(initialCode);
    }
  }, [isAuthenticated, initialCode, verifyCode]);

  async function handleVerifySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await verifyCode(code);
  }

  async function handleApprove() {
    const targetCode = verification?.user_code ?? code;
    if (!targetCode) return;

    setError(null);
    setIsSubmittingDecision("approve");

    try {
      const { error: approveError } = await authClient.device.approve({
        userCode: targetCode,
      });

      if (approveError) {
        setError(
          getDeviceErrorMessage(
            approveError,
            "Unable to approve this device. Please try again.",
          ),
        );
        return;
      }

      storeDecision({
        user_code: targetCode,
        status: "approved",
        client_id: verification?.client_id,
        scope: verification?.scope,
      });
      setStep("approved");
    } catch {
      setError("Unable to approve this device. Please try again.");
    } finally {
      setIsSubmittingDecision(null);
    }
  }

  async function handleDeny() {
    const targetCode = verification?.user_code ?? code;
    if (!targetCode) return;

    setError(null);
    setIsSubmittingDecision("deny");

    try {
      const { error: denyError } = await authClient.device.deny({
        userCode: targetCode,
      });

      if (denyError) {
        setError(
          getDeviceErrorMessage(
            denyError,
            "Unable to deny this device. Please try again.",
          ),
        );
        return;
      }

      storeDecision({
        user_code: targetCode,
        status: "denied",
        client_id: verification?.client_id,
        scope: verification?.scope,
      });
      setStep("denied");
    } catch {
      setError("Unable to deny this device. Please try again.");
    } finally {
      setIsSubmittingDecision(null);
    }
  }

  function handleReset() {
    setCode("");
    setVerification(null);
    setError(null);
    setStep("enter-code");
    if (searchParams.get("user_code")) {
      router.replace("/device");
    }
  }

  if (isSessionPending) {
    return <DeviceCardSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-2xl bg-muted text-foreground">
            <KeyRound className="size-5" />
          </div>
          <CardTitle className="text-xl tracking-tight">
            Sign in to authorize your CLI
          </CardTitle>
          <CardDescription>
            You need to be signed in to your CloseCode account before connecting
            a terminal session.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {initialCode && (
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-3.5 py-2.5 text-sm">
              <span className="text-muted-foreground">Device code</span>
              <Badge variant="secondary" className="font-mono tracking-wider">
                {formatUserCode(initialCode)}
              </Badge>
            </div>
          )}

          <div className="flex flex-col gap-2.5">
            <Link href={AUTH_ROUTE.signin} className="w-full">
              <Button size="lg" className="w-full">
                <LogIn data-icon="inline-start" />
                Sign in to continue
              </Button>
            </Link>
            <Link href={AUTH_ROUTE.signup} className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                <UserPlus data-icon="inline-start" />
                Create an account
              </Button>
            </Link>
          </div>
        </CardContent>

        <CardFooter className="justify-center border-t pt-4 text-xs text-muted-foreground">
          After signing in, return to this page or re-run the CLI command.
        </CardFooter>
      </Card>
    );
  }

  const user = sessionData!.user;
  const scopes = parseScopes(verification?.scope);

  return (
    <Card className="shadow-sm">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3 rounded-xl border bg-muted/40 p-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar size="sm">
              {user.image && <AvatarImage src={user.image} alt={user.name} />}
              <AvatarFallback>
                {getInitials(user.name, user.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-xs font-medium text-foreground">
                {user.name || "CloseCode User"}
              </span>
              <span className="truncate text-[11px] text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
          <Badge variant="secondary" className="shrink-0 text-[11px]">
            <ShieldCheck />
            Signed in
          </Badge>
        </div>

        {step === "enter-code" && (
          <div className="space-y-1 pt-1">
            <CardTitle className="text-xl tracking-tight">
              Connect your device
            </CardTitle>
            <CardDescription>
              Enter the 8-character code displayed in your terminal to link your
              CLI.
            </CardDescription>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-1 pt-1">
            <CardTitle className="text-xl tracking-tight">
              Authorize CLI access?
            </CardTitle>
            <CardDescription>
              Confirm that the code below matches what you see in your terminal.
            </CardDescription>
          </div>
        )}

        {step === "approved" && (
          <div className="space-y-1 pt-1 text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-6" />
            </div>
            <CardTitle className="text-xl tracking-tight">
              Device authorized
            </CardTitle>
            <CardDescription>
              Your CLI session is now authenticated. You can return to your
              terminal.
            </CardDescription>
          </div>
        )}

        {step === "denied" && (
          <div className="space-y-1 pt-1 text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <XCircle className="size-6" />
            </div>
            <CardTitle className="text-xl tracking-tight">
              Authorization denied
            </CardTitle>
            <CardDescription>
              The request was declined and no access was granted to the CLI.
            </CardDescription>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>Verification issue</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === "enter-code" && (
          <form onSubmit={handleVerifySubmit} className="flex flex-col gap-5">
            <Field data-invalid={Boolean(error)} className="items-center">
              <FieldLabel htmlFor="device-user-code" className="sr-only">
                Device verification code
              </FieldLabel>

              <InputOTP
                id="device-user-code"
                maxLength={USER_CODE_LENGTH}
                value={code}
                onChange={(nextValue) => {
                  setError(null);
                  setCode(normalizeUserCode(nextValue));
                }}
                pattern="^[a-zA-Z0-9]+$"
                containerClassName="justify-center"
                disabled={isVerifying}
                autoFocus
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="size-10 font-mono text-base font-semibold uppercase sm:size-11"
                  />
                  <InputOTPSlot
                    index={1}
                    className="size-10 font-mono text-base font-semibold uppercase sm:size-11"
                  />
                  <InputOTPSlot
                    index={2}
                    className="size-10 font-mono text-base font-semibold uppercase sm:size-11"
                  />
                  <InputOTPSlot
                    index={3}
                    className="size-10 font-mono text-base font-semibold uppercase sm:size-11"
                  />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot
                    index={4}
                    className="size-10 font-mono text-base font-semibold uppercase sm:size-11"
                  />
                  <InputOTPSlot
                    index={5}
                    className="size-10 font-mono text-base font-semibold uppercase sm:size-11"
                  />
                  <InputOTPSlot
                    index={6}
                    className="size-10 font-mono text-base font-semibold uppercase sm:size-11"
                  />
                  <InputOTPSlot
                    index={7}
                    className="size-10 font-mono text-base font-semibold uppercase sm:size-11"
                  />
                </InputOTPGroup>
              </InputOTP>

              <FieldDescription className="text-center">
                You can paste the full code directly into the boxes above.
              </FieldDescription>
              {error && (
                <FieldError className="text-center">{error}</FieldError>
              )}
            </Field>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isVerifying || code.length < USER_CODE_LENGTH}
            >
              {isVerifying ? (
                <>
                  Verifying code
                  <Spinner data-icon="inline-end" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight data-icon="inline-end" />
                </>
              )}
            </Button>
          </form>
        )}

        {step === "review" && verification && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border bg-muted/30 py-4">
              <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                Verification Code
              </span>
              <span className="font-mono text-2xl font-semibold tracking-[0.2em] text-foreground">
                {formatUserCode(verification.user_code)}
              </span>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border p-3.5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Laptop className="size-4" />
                  Application
                </span>
                <Badge variant="outline" className="font-mono text-xs">
                  {verification.client_id ?? "close-code-cli"}
                </Badge>
              </div>

              {scopes.length > 0 && (
                <>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Requested permissions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {scopes.map((scope) => (
                        <Badge
                          key={scope}
                          variant="secondary"
                          className="font-mono text-xs"
                        >
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Only approve this request if you ran{" "}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px] text-foreground">
                login
              </code>{" "}
              from your own terminal.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleDeny}
                disabled={isSubmittingDecision !== null}
              >
                {isSubmittingDecision === "deny" ? (
                  <>
                    Denying
                    <Spinner data-icon="inline-end" />
                  </>
                ) : (
                  "Deny"
                )}
              </Button>

              <Button
                type="button"
                size="lg"
                onClick={handleApprove}
                disabled={isSubmittingDecision !== null}
              >
                {isSubmittingDecision === "approve" ? (
                  <>
                    Approving
                    <Spinner data-icon="inline-end" />
                  </>
                ) : (
                  <>
                    Approve
                    <ShieldCheck data-icon="inline-end" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === "approved" && (
          <div className="flex flex-col gap-3">
            {verification && (
              <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-3.5 py-2.5 text-sm">
                <span className="text-muted-foreground">Authorized code</span>
                <Badge variant="secondary" className="font-mono">
                  {formatUserCode(verification.user_code)}
                </Badge>
              </div>
            )}

            <Link href={MAIN_ROUTE.dashboard} className="w-full">
              <Button size="lg" className="w-full">
                Go to Dashboard
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="w-full"
            >
              Authorize another device
            </Button>
          </div>
        )}

        {step === "denied" && (
          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full" onClick={handleReset}>
              Enter a different code
            </Button>
            <Link href={MAIN_ROUTE.dashboard} className="w-full">
              <Button variant="outline" size="lg" className="w-full">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function DevicePage() {
  return (
    <DeviceShell>
      <Suspense fallback={<DeviceCardSkeleton />}>
        <DeviceAuthorizationContent />
      </Suspense>
    </DeviceShell>
  );
}
