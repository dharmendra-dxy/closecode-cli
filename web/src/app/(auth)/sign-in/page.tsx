import type { Metadata } from "next";
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AUTH_ROUTE } from "@/lib/ui-route";

export const metadata: Metadata = {
  title: "Sign in | CloseCode",
  description: "Sign in to your CloseCode account.",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="[--card-spacing:--spacing(6)] shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription>
            Sign in to pick up right where you left off.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
                <InputGroupInput
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </InputGroup>
            </Field>

            <Field>
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
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </InputGroup>
            </Field>

            <Field orientation="horizontal">
              <Checkbox id="remember" />
              <FieldLabel
                htmlFor="remember"
                className="font-normal text-muted-foreground"
              >
                Remember me for 30 days
              </FieldLabel>
            </Field>

            <Button type="button" size="lg" className="w-full">
              Sign in
              <ArrowRight data-icon="inline-end" />
            </Button>
          </FieldGroup>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        New to CloseCode?{" "}
        <Link
          href={AUTH_ROUTE.signup}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
