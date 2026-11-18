import { cn } from "cn";
import {   Image as ImageIcon, } from "lucide-react";

export function MediaPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed bg-muted/40",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background/60 to-muted/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[size:20px_20px] opacity-60" />
      <div className="relative flex flex-col items-center gap-3 text-muted-foreground">
        <span className="flex size-11 items-center justify-center rounded-xl border bg-background/90 shadow-sm">
          <ImageIcon className="size-5" />
        </span>
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground/70">
          Image placeholder
        </span>
      </div>
    </div>
  );
}