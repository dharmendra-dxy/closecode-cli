import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "cn";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "CloseCode",
  description: "Ai generations made easy",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", poppins.className)}>
      <TooltipProvider>
        <body className="min-h-full flex flex-col">{children}</body>
      </TooltipProvider>
    </html>
  );
}
