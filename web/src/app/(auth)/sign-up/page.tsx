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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export const metadata: Metadata = {
  title: "Create account | CloseCode",
  description: "Create your CloseCode account.",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-6">
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
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
                <InputGroupInput
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
              </InputGroup>
              <FieldDescription>
                Use 8 or more characters with a mix of letters and numbers.
              </FieldDescription>
            </Field>

            <Field orientation="horizontal">
              <Checkbox id="terms" />
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

            <Button type="button" size="lg" className="w-full">
              Create account
              <ArrowRight data-icon="inline-end" />
            </Button>
          </FieldGroup>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
