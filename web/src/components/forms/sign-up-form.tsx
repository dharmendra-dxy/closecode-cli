"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

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
  FieldDescription,
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

export function SignUpForm() {
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: MAIN_ROUTE.dashboard,
    });

    if (signUpError) {
      setError(signUpError.message ?? "Unable to create your account.");
      setIsPending(false);
      return;
    }

    router.replace(MAIN_ROUTE.dashboard);
    router.refresh();
  }

  return (
    <Card className="[--card-spacing:--spacing(6)] shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">
          Create your account
        </CardTitle>
        <CardDescription>
          Start building with CloseCode in a few seconds.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-5">
            <Field data-invalid={Boolean(error)}>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
                <InputGroupInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  aria-invalid={Boolean(error)}
                  required
                />
              </InputGroup>
            </Field>

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
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(error)}
                  minLength={8}
                  required
                />
              </InputGroup>
              <FieldDescription>
                Use 8 or more characters with a mix of letters and numbers.
              </FieldDescription>
            </Field>

            <Field orientation="horizontal">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked)}
              />
              <FieldLabel
                htmlFor="terms"
                className="font-normal leading-snug text-muted-foreground"
              >
                I agree to the{" "}
                <Link
                  href="#"
                  className="text-foreground underline underline-offset-4"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-foreground underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                .
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
                  Creating account
                  <Spinner data-icon="inline-end" />
                </>
              ) : (
                <>
                  Create account
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
