import { Braces } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <Braces className="size-4" />
      </span>
      <span className="text-sm font-semibold tracking-tight">CloseCode</span>
    </Link>
  );
}