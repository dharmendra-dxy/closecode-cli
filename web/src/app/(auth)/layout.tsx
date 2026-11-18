import Image from "next/image";
import { Braces, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-h-svh flex-1 lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Braces className="size-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-semibold tracking-tight">
              CloseCode
            </span>
            <span className="mt-1 text-[11px] text-muted-foreground">
              AI generations made easy
            </span>
          </span>
        </header>

        <main className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm">{children}</div>
        </main>

        <footer className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 CloseCode</span>
          <div className="flex items-center gap-4">
            <span className="transition-colors hover:text-foreground">
              Privacy
            </span>
            <span className="transition-colors hover:text-foreground">
              Terms
            </span>
          </div>
        </footer>
      </div>

      <aside className="relative hidden p-4 lg:block">
        <div className="relative h-full overflow-hidden rounded-3xl">
          <Image
            src="/auth-bg.jpg"
            alt="Code on a developer's screen"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

          <div className="absolute inset-0 flex flex-col justify-between p-10 xl:p-12">
            <Badge
              variant="outline"
              className="w-fit border-white/20 bg-white/10 text-white backdrop-blur-sm"
            >
              <Sparkles />
              AI pair programmer
            </Badge>

            <div className="space-y-4">
              <p className="max-w-md text-3xl leading-tight font-medium tracking-tight text-white xl:text-4xl">
                “From prompt to production — without the busywork.”
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-white/70">
                CloseCode helps you generate, review, and ship high-quality code
                while you stay in flow.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-white/60">
                <span className="h-px w-8 bg-white/30" />
                Built for developers who care about craft.
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
