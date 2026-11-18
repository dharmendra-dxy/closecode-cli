import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CircleCheck,
  Lock,
  Sparkles,
  Star,
} from "lucide-react";
import { cn } from "cn";

import { AUTH_ROUTE } from "@/lib/ui-route";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Logo } from "@/components/shared/logo";
import { faqs, features, steps, testimonials } from "@/constants/landing-page";
import { MediaPlaceholder } from "./media-placeholder";

const LandingPage = () => {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-foreground"
            >
              How it works
            </a>
            <a
              href="#testimonials"
              className="transition-colors hover:text-foreground"
            >
              Customers
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={AUTH_ROUTE.signin}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Sign in
            </Link>
            <Link
              href={AUTH_ROUTE.signup}
              className={cn(buttonVariants({ size: "sm" }), "px-3")}
            >
              Get started
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)] opacity-50" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-gradient-to-b from-muted/70 to-transparent" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
            <Badge
              variant="outline"
              className="h-6 gap-1.5 bg-background/70 px-2.5 backdrop-blur"
            >
              <Sparkles className="text-primary" />
              Now in public beta
            </Badge>

            <h1 className="mt-6 max-w-4xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Turn ideas into{" "}
              <span className="bg-gradient-to-r from-foreground to-foreground/45 bg-clip-text text-transparent">
                production code
              </span>
              .
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              CloseCode is the AI pair programmer that understands your
              codebase. Generate features, review pull requests, and ship with
              confidence — without leaving your flow.
            </p>

            <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
              <Link
                href={AUTH_ROUTE.signup}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 w-full px-5 text-sm sm:w-auto",
                )}
              >
                Start building free
                <ArrowRight data-icon="inline-end" />
              </Link>
              <Link
                href={AUTH_ROUTE.signin}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 w-full px-5 text-sm sm:w-auto",
                )}
              >
                Sign in
              </Link>
            </div>

            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CircleCheck className="size-3.5" />
                Free to start
              </span>
              <span className="flex items-center gap-1.5">
                <CircleCheck className="size-3.5" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CircleCheck className="size-3.5" />
                Setup in minutes
              </span>
            </p>

            <div className="relative mt-16 w-full max-w-5xl">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-r from-primary/15 via-primary/5 to-primary/15 blur-2xl" />

              <div className="overflow-hidden rounded-2xl border bg-card/80 shadow-2xl backdrop-blur">
                <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-3">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-amber-400/80" />
                  <span className="size-2.5 rounded-full bg-emerald-400/80" />
                  <div className="mx-auto flex h-7 w-full max-w-xs items-center justify-center gap-1.5 rounded-md border bg-background px-3 text-[11px] text-muted-foreground">
                    <Lock className="size-3" />
                    app.closecode.ai
                  </div>
                  <div className="w-12" />
                </div>

                <div className="grid lg:grid-cols-[190px_1fr]">
                  <div className="hidden flex-col gap-3 border-r bg-muted/20 p-4 lg:flex">
                    <div className="h-8 w-full rounded-lg border bg-background" />
                    <div className="mt-2 h-2 w-4/5 rounded-full bg-muted-foreground/15" />
                    <div className="h-2 w-3/5 rounded-full bg-muted-foreground/10" />
                    <div className="mt-4 h-2 w-2/3 rounded-full bg-muted-foreground/15" />
                    <div className="h-2 w-1/2 rounded-full bg-muted-foreground/10" />
                    <div className="mt-4 h-2 w-3/4 rounded-full bg-muted-foreground/15" />
                    <div className="h-2 w-2/5 rounded-full bg-muted-foreground/10" />
                  </div>

                  <MediaPlaceholder
                    label="App preview"
                    className="aspect-[16/10] rounded-none border-0 lg:aspect-[16/8]"
                  />
                </div>
              </div>

              <div className="absolute top-24 -left-5 hidden items-center gap-2 rounded-xl border bg-background/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur sm:flex">
                <Sparkles className="size-4 text-primary" />
                Generated 12 files
              </div>

              <div className="absolute -right-5 bottom-20 hidden items-center gap-2 rounded-xl border bg-background/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur sm:flex">
                <CircleCheck className="size-4 text-emerald-600" />
                Review passed
              </div>
            </div>
          </div>
        </section>

        <section className="border-y bg-muted/30 py-8">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <p className="text-center text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Powering teams that ship every day
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="flex h-9 items-center justify-center rounded-lg border border-dashed bg-background/60 text-[10px] font-medium tracking-widest text-muted-foreground/60 uppercase"
                >
                  Logo {index + 1}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
        >
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary">Features</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Everything you need to go from idea to merge
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
              One tool for generation, review, and everything in between — built
              around the way your team already works.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="[--card-spacing:--spacing(6)] transition-colors hover:ring-foreground/20"
              >
                <CardHeader>
                  <span className="mb-3 flex size-10 items-center justify-center rounded-xl border bg-muted/50 text-foreground">
                    <feature.icon className="size-5" />
                  </span>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary">How it works</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Three steps from prompt to pull request
              </h2>
              <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
                No new editor, no new dashboard habits. CloseCode plugs into the
                tools your team already uses.
              </p>
            </div>

            <div className="relative mt-12 grid gap-6 md:grid-cols-3">
              <div className="absolute top-6 right-[16%] left-[16%] hidden h-px bg-border md:block" />
              {steps.map((step, index) => (
                <div key={step.title} className="relative flex flex-col">
                  <div className="flex size-12 items-center justify-center rounded-full border bg-background text-sm font-semibold shadow-sm">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 text-lg font-medium">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="secondary">Generate</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                From a prompt to a pull request in minutes
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Describe the feature or bug in plain English. CloseCode finds
                the relevant files, writes the change, and explains every
                decision along the way.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Repo-aware suggestions",
                  "Follows your conventions",
                  "Explains the why, not just the diff",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <MediaPlaceholder
              label="Generation preview"
              className="aspect-[4/3] shadow-xl"
            />
          </div>

          <Separator className="my-20" />

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <MediaPlaceholder
              label="Review preview"
              className="order-last aspect-[4/3] shadow-xl lg:order-first"
            />
            <div>
              <Badge variant="secondary">Review</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                A senior reviewer on every pull request
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                CloseCode reviews every change the moment it lands, flagging
                bugs, missing tests, and security issues with clear, actionable
                fixes.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Inline comments with suggested fixes",
                  "Test gaps and edge cases",
                  "Security and performance checks",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="testimonials" className="border-y bg-muted/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary">Customers</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Loved by developers who care about craft
              </h2>
              <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
                Teams of every size use CloseCode to move faster without
                lowering the bar.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.name}
                  className="[--card-spacing:--spacing(6)]"
                >
                  <CardContent className="flex h-full flex-col gap-5">
                    <div className="flex items-center gap-0.5">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className="size-3.5 fill-foreground text-foreground"
                        />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed">
                      “{testimonial.quote}”
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <Avatar>
                        <AvatarFallback className="text-xs font-medium">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {testimonial.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 sm:py-28"
        >
          <div className="text-center">
            <Badge variant="secondary">FAQ</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Questions, answered
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </div>

          <Accordion className="mt-10 rounded-2xl border bg-card px-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="px-4 pb-20 sm:px-6 sm:pb-28">
          <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] bg-[size:24px_24px] opacity-[0.06]" />
            <div className="relative">
              <span className="mx-auto flex size-11 items-center justify-center rounded-xl border border-primary-foreground/15 bg-primary-foreground/10">
                <BadgeCheck className="size-5" />
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Ship your next idea today
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-primary-foreground/70">
                Join the developers using CloseCode to spend less time on
                boilerplate and more time building things that matter.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={AUTH_ROUTE.signup}
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "h-11 w-full px-5 text-sm sm:w-auto",
                  )}
                >
                  Get started free
                  <ArrowRight data-icon="inline-end" />
                </Link>
                <Link
                  href={AUTH_ROUTE.signin}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "h-11 w-full px-5 text-sm text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto",
                  )}
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <Logo />
              <p className="text-xs text-muted-foreground">
                AI generations made easy.
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <a
                href="#features"
                className="transition-colors hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="transition-colors hover:text-foreground"
              >
                How it works
              </a>
              <a
                href="#faq"
                className="transition-colors hover:text-foreground"
              >
                FAQ
              </a>
              <Link
                href={AUTH_ROUTE.signin}
                className="transition-colors hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                href={AUTH_ROUTE.signup}
                className="transition-colors hover:text-foreground"
              >
                Create account
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 CloseCode. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span className="transition-colors hover:text-foreground">
                Privacy
              </span>
              <span className="transition-colors hover:text-foreground">
                Terms
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
