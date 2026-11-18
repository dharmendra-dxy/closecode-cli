import type { Metadata } from "next";
import Link from "next/link";

import { AUTH_ROUTE } from "@/lib/ui-route";

import { SignUpForm } from "@/components/forms/sign-up-form";

export const metadata: Metadata = {
  title: "Create account | CloseCode",
  description: "Create your CloseCode account.",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-6">
      <SignUpForm />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={AUTH_ROUTE.signin}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
