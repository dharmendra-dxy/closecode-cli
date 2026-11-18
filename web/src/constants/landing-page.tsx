import {
  Gauge,
  GitPullRequest,
  Layers,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const features = [
  {
    icon: Sparkles,
    title: "Context-aware generation",
    description:
      "CloseCode indexes your repository, so generated code follows your patterns, naming, and architecture — not generic boilerplate.",
  },
  {
    icon: ScanSearch,
    title: "Reviews that catch real issues",
    description:
      "Catch logic bugs, missing edge cases, and risky patterns before they ever reach a human reviewer.",
  },
  {
    icon: GitPullRequest,
    title: "Git-native workflows",
    description:
      "Open a pull request, request changes, and iterate from the tools you already use. No new workflow to learn.",
  },
  {
    icon: ShieldCheck,
    title: "Security by default",
    description:
      "Secrets stay out of prompts, and every suggestion is checked against your project's security rules.",
  },
  {
    icon: Layers,
    title: "Works with your stack",
    description:
      "TypeScript, Python, Go, React, Postgres — if your team writes it, CloseCode understands it.",
  },
  {
    icon: Gauge,
    title: "Built for speed",
    description:
      "Fast suggestions and background reviews keep you in flow instead of waiting on a spinner.",
  },
];

export const steps = [
  {
    title: "Connect your repository",
    description:
      "Install the GitHub app and choose the repositories you want CloseCode to work with.",
  },
  {
    title: "Describe what you need",
    description:
      "Write a prompt or open an issue. CloseCode gathers the context and drafts the change.",
  },
  {
    title: "Review and ship",
    description:
      "Approve, edit, or ask for another pass. Merge when you are happy with the result.",
  },
];

export const testimonials = [
  {
    quote:
      "CloseCode cut our review cycle in half. The suggestions feel like they came from a teammate who already knows the codebase.",
    name: "Maya Patel",
    role: "Engineering Lead, Northwind",
    initials: "MP",
  },
  {
    quote:
      "I describe the ticket, grab a coffee, and come back to a pull request that actually follows our patterns.",
    name: "Daniel Kim",
    role: "Staff Engineer, Vertex Labs",
    initials: "DK",
  },
  {
    quote:
      "It catches the things I miss at 5pm on a Friday. The first AI tool that made our codebase better, not noisier.",
    name: "Sofia Ramirez",
    role: "CTO, Fieldwork",
    initials: "SR",
  },
];

export const faqs = [
  {
    question: "What is CloseCode?",
    answer:
      "CloseCode is an AI pair programmer that helps you generate, review, and ship code directly from your repository. It works alongside your existing Git workflow.",
  },
  {
    question: "Does CloseCode work with my stack?",
    answer:
      "CloseCode supports the languages and frameworks your team already uses, including TypeScript, JavaScript, Python, Go, React, Next.js, and Postgres.",
  },
  {
    question: "Is my code used to train models?",
    answer:
      "No. Your code is never used to train models. CloseCode only reads the context needed to complete your request, and permissions mirror your GitHub setup.",
  },
  {
    question: "Can I try CloseCode for free?",
    answer:
      "Yes. Start on the free plan and upgrade when your team needs more usage, seats, or advanced controls. No credit card is required to get started.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams connect a repository and open their first generated pull request in under ten minutes.",
  },
];