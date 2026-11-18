import type { Metadata } from "next";
import Link from "next/link";

import { AUTH_ROUTE } from "@/lib/ui-route";

import { SignInForm } from "@/components/forms/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in | CloseCode",
  description: "Sign in to your CloseCode account.",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-6">
      <SignInForm />

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
