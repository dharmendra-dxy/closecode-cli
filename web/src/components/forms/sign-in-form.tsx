"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { MAIN_ROUTE } from "@/lib/ui-route";

export function SignInForm() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
      callbackURL: MAIN_ROUTE.dashboard,
    });

    if (signInError) {
      setError(signInError.message ?? "Unable to sign in. Please try again.");
      setIsPending(false);
      return;
    }

    router.replace(MAIN_ROUTE.dashboard);
    router.refresh();
  }

  return (
    <Card className="[--card-spacing:--spacing(6)] shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">Welcome back</CardTitle>
        <CardDescription>
          Sign in to pick up right where you left off.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-5">
            <Field data-invalid={Boolean(error)}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(error)}
                  required
                />
              </InputGroup>
            </Field>

            <Field data-invalid={Boolean(error)}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="#"
                  className="text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <InputGroup>
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={Boolean(error)}
                  required
                />
              </InputGroup>
            </Field>

            <Field orientation="horizontal">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked)}
              />
              <FieldLabel
                htmlFor="remember"
                className="font-normal text-muted-foreground"
              >
                Remember me for 30 days
              </FieldLabel>
            </Field>

            {error && <FieldError>{error}</FieldError>}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  Signing in
                  <Spinner data-icon="inline-end" />
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight data-icon="inline-end" />
                </>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
