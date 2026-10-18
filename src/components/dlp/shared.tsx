import type { LucideIcon } from "lucide-react";
import type { Sensitivity } from "./mock-api";

export function Button({ children, variant = "secondary", size = "md", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "icon" }) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
    secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-accent",
    ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
    danger: "bg-destructive/15 text-destructive border border-destructive/25 hover:bg-destructive/25",
  };
  const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm", icon: "size-10" };
  return <button className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}

export function StatusBadge({ level }: { level: Sensitivity }) {
  const style = { Restricted: "bg-danger-soft text-danger", Confidential: "bg-warning-soft text-warning", Internal: "bg-info-soft text-info", Public: "bg-success-soft text-success" }[level];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${style}`}>{level}</span>;
}

export function Pill({ label, tone }: { label: string; tone: "danger" | "warning" | "info" | "success" | "muted" }) {
  const styles = {
    danger: "bg-danger-soft text-danger",
    warning: "bg-warning-soft text-warning",
    info: "bg-info-soft text-info",
    success: "bg-success-soft text-success",
    muted: "bg-muted text-muted-foreground",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${styles[tone]}`}>{label}</span>;
}

export function MetricCard({ icon: Icon, label, value, detail, tone, delta = "+8.4%" }: { icon: LucideIcon; label: string; value: string; detail: string; tone: string; delta?: string }) {
  return (
    <article className="rounded-lg border border-border bg-card p-4 shadow-panel">
      <div className="flex items-start justify-between">
        <div className={`flex size-9 items-center justify-center rounded-md ${tone}`}><Icon size={18} /></div>
        <span className="text-[11px] font-medium text-success">{delta}</span>
      </div>
      <p className="mt-4 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{detail}</p>
    </article>
  );
}

export function Panel({ title, subtitle, action, children, className = "" }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <article className={`rounded-lg border border-border bg-card p-5 shadow-panel ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold">{title}</h2>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </article>
  );
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{description}</p>
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function ApiBadge({ endpoint, latency }: { endpoint: string; latency: number | null }) {
  return (
    <span className="hidden items-center gap-2 rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground sm:inline-flex">
      <span className={`size-1.5 rounded-full ${latency === null ? "bg-warning" : "bg-success"}`} />
      GET {endpoint}{latency !== null ? ` · ${latency}ms` : " · loading"}
    </span>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-10 animate-pulse rounded-md bg-muted/60" />
      ))}
    </div>
  );
}
