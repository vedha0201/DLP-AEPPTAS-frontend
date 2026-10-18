import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Cloud,
  Database,
  Download,
  FileKey,
  FileSearch,
  Filter,
  Fingerprint,
  GitBranch,
  HardDrive,
  LayoutDashboard,
  LockKeyhole,
  Network,
  Plus,
  RefreshCw,
  ScanSearch,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { dlpApi, type Classification, type Sensitivity } from "./dlp/mock-api";
import { useApi } from "./dlp/use-api";
import { ApiBadge, TableSkeleton } from "./dlp/shared";

export const navGroups: { label: string; items: { name: string; icon: LucideIcon }[] }[] = [
  { label: "Overview", items: [{ name: "Security Overview", icon: LayoutDashboard }] },
  { label: "Data Security", items: [{ name: "Data Discovery", icon: Database }, { name: "Data Classification", icon: ScanSearch }, { name: "Data Lineage", icon: GitBranch }] },
  { label: "Policy", items: [{ name: "Policies", icon: ShieldCheck }, { name: "Compliance", icon: LockKeyhole }] },
  { label: "Operations", items: [{ name: "Incidents", icon: AlertTriangle }, { name: "Endpoints", icon: HardDrive }, { name: "Real-Time Monitoring", icon: Zap }] },
  { label: "Intelligence", items: [{ name: "Reporting & Analytics", icon: Activity }, { name: "UEBA", icon: Users }, { name: "Risk Analytics", icon: Fingerprint }] },
  { label: "Administration", items: [{ name: "Integrations", icon: Network }, { name: "Settings", icon: Settings }] },
];

function Button({ children, variant = "secondary", size = "md", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "icon" }) {
  const variants = { primary: "bg-primary text-primary-foreground hover:bg-primary-hover", secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-accent", ghost: "text-muted-foreground hover:bg-accent hover:text-foreground", danger: "bg-destructive/15 text-destructive border border-destructive/25 hover:bg-destructive/25" };
  const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm", icon: "size-10" };
  return <button className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}

function StatusBadge({ level }: { level: Classification["sensitivity"] }) {
  const style = { Restricted: "bg-danger-soft text-danger", Confidential: "bg-warning-soft text-warning", Internal: "bg-info-soft text-info", Public: "bg-success-soft text-success" }[level];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${style}`}>{level}</span>;
}

function MetricCard({ icon: Icon, label, value, detail, tone }: { icon: LucideIcon; label: string; value: string; detail: string; tone: string }) {
  return (
    <article className="rounded-lg border border-border bg-card p-4 shadow-panel">
      <div className="flex items-start justify-between">
        <div className={`flex size-9 items-center justify-center rounded-md ${tone}`}><Icon size={18} /></div>
        <span className="text-[11px] font-medium text-success">+8.4%</span>
      </div>
      <p className="mt-4 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{detail}</p>
    </article>
  );
}

function DonutChart({ percent = 82 }: { percent?: number }) {
  const strokeDashoffset = 302 - (302 * percent) / 100;
  return (
    <div className="relative size-36 shrink-0">
      <svg viewBox="0 0 120 120" className="size-full -rotate-90" role="img" aria-label={`Classified data coverage ${percent} percent`}>
        <circle cx="60" cy="60" r="48" fill="none" className="stroke-muted" strokeWidth="12" />
        <circle cx="60" cy="60" r="48" fill="none" className="stroke-primary" strokeWidth="12" strokeLinecap="round" strokeDasharray="302" strokeDashoffset={strokeDashoffset} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-bold">{percent}%</span><span className="text-[10px] text-muted-foreground">covered</span></div>
    </div>
  );
}

function NewClassificationModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [method, setMethod] = useState("AI-assisted");
  const [scope, setScope] = useState("All connected sources");
  const [sensitivity, setSensitivity] = useState<Sensitivity>("Confidential");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const canContinue = step !== 1 || name.trim().length > 2;

  async function handleCreate() {
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await dlpApi.createClassification({
        name: name.trim(),
        ...(description.trim() ? { description: description.trim() } : {}),
        sensitivity,
        source: scope,
      });
      if (res.ok) {
        setDone(true);
        onCreated();
      } else {
        setErrorMsg(`Backend returned status ${res.status}`);
      }
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Failed to connect to backend API server");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4" role="dialog" aria-modal="true" aria-label="Classification created">
      <div className="w-full max-w-md rounded-lg border border-border bg-popover p-8 text-center shadow-modal">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success-soft text-success"><Check size={24} /></div>
        <h2 className="mt-5 text-xl font-bold">Classification created on backend</h2>
        <p className="mt-2 text-sm text-muted-foreground">{name} has been saved to the backend API and queued for discovery.</p>
        <Button variant="primary" className="mt-6 w-full" onClick={onClose}>Return to classifications</Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-modal">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Step {step} of 3</p><h2 id="modal-title" className="mt-1 text-lg font-bold">New data classification</h2></div>
          <Button size="icon" variant="ghost" aria-label="Close dialog" onClick={onClose}><X size={18} /></Button>
        </div>
        <div className="grid grid-cols-3 border-b border-border bg-secondary/40">
          {["Details", "Detection", "Review"].map((item, index) => <div key={item} className={`border-b-2 px-3 py-3 text-center text-xs font-semibold ${step === index + 1 ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>{index + 1}. {item}</div>)}
        </div>
        <div className="overflow-y-auto p-5 sm:p-6">
          {errorMsg && (
            <div className="mb-4 rounded-md border border-danger/30 bg-danger-soft p-3 text-xs text-danger">
              {errorMsg}
            </div>
          )}
          {step === 1 && <div className="space-y-5">
            <div><label className="mb-2 block text-sm font-semibold" htmlFor="classification-name">Classification name</label><input id="classification-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Customer Financial Records" className="h-11 w-full rounded-md border border-input bg-field px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" />{name.length > 0 && name.trim().length < 3 && <p className="mt-2 text-xs text-danger">Enter at least 3 characters.</p>}</div>
            <div><label className="mb-2 block text-sm font-semibold" htmlFor="description">Description</label><textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe the information this classification should identify." className="w-full resize-none rounded-md border border-input bg-field p-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" /></div>
            <div><p className="mb-2 text-sm font-semibold">Sensitivity</p><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{(["Restricted", "Confidential", "Internal", "Public"] as const).map((item) => <Button key={item} variant={sensitivity === item ? "primary" : "secondary"} size="sm" onClick={() => setSensitivity(item)}>{item}</Button>)}</div></div>
          </div>}
          {step === 2 && <div className="space-y-5">
            <div><p className="mb-2 text-sm font-semibold">Detection method</p><div className="grid gap-3 sm:grid-cols-2">{[{ name: "AI-assisted", icon: Sparkles, copy: "Context-aware discovery with confidence scoring." }, { name: "Pattern rules", icon: Fingerprint, copy: "Keywords, regular expressions and dictionaries." }].map((item) => <button key={item.name} onClick={() => setMethod(item.name)} className={`rounded-lg border p-4 text-left transition-colors ${method === item.name ? "border-primary bg-primary/10" : "border-border bg-secondary/40 hover:bg-accent"}`}><item.icon size={20} className={method === item.name ? "text-primary" : "text-muted-foreground"} /><span className="mt-3 block text-sm font-bold">{item.name}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.copy}</span></button>)}</div></div>
            <div><label className="mb-2 block text-sm font-semibold" htmlFor="scope">Scan scope</label><select id="scope" value={scope} onChange={(event) => setScope(event.target.value)} className="h-11 w-full rounded-md border border-input bg-field px-3 text-sm outline-none focus:border-primary"><option>All connected sources</option><option>Cloud repositories</option><option>Endpoints only</option><option>Email and collaboration</option></select></div>
            <div><label className="mb-2 block text-sm font-semibold" htmlFor="patterns">Keywords or patterns</label><input id="patterns" placeholder="account number, tax ID, confidential" className="h-11 w-full rounded-md border border-input bg-field px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary" /></div>
          </div>}
          {step === 3 && <div className="space-y-3">
            <h3 className="text-sm font-bold">Review configuration</h3>
            {[ ["Name", name], ["Sensitivity", sensitivity], ["Detection", method], ["Scope", scope] ].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 rounded-md border border-border bg-secondary/40 px-4 py-3"><span className="text-xs text-muted-foreground">{label}</span><span className="text-right text-sm font-semibold">{value}</span></div>)}
            <div className="flex gap-3 rounded-md border border-info/25 bg-info-soft p-3 text-info"><CircleHelp size={18} className="shrink-0" /><p className="text-xs leading-5">Creating this classification will persist it to your Express backend at /api/v1/classifications.</p></div>
          </div>}
        </div>
        <div className="flex items-center justify-between border-t border-border px-5 py-4"><Button variant="ghost" disabled={step === 1 || submitting} onClick={() => setStep((current) => current - 1)}><ChevronLeft size={16} /> Back</Button>{step < 3 ? <Button variant="primary" disabled={!canContinue} onClick={() => setStep((current) => current + 1)}>Continue <ChevronRight size={16} /></Button> : <Button variant="primary" disabled={submitting} onClick={handleCreate}><Check size={16} /> {submitting ? "Saving to backend..." : "Create classification"}</Button>}</div>
      </div>
    </div>
  );
}

export function ClassificationModule({ notify }: { notify: (message: string) => void }) {
  const [query, setQuery] = useState("");
  const [sensitivity, setSensitivity] = useState("All sensitivities");
  const [live, setLive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const { data, loading, latency, error, reload } = useApi<Classification[]>(dlpApi.getClassifications);
  const classifications = data ?? [];

  const filtered = useMemo(() => classifications.filter((item) => (sensitivity === "All sensitivities" || item.sensitivity === sensitivity) && `${item.name} ${item.source} ${item.owner}`.toLowerCase().includes(query.toLowerCase())), [classifications, query, sensitivity]);

  // Derived metrics from real backend data
  const totalClassified = useMemo(() => {
    if (!classifications.length) return "0";
    let count = 0;
    for (const c of classifications) {
      const parsed = parseInt(c.records.replace(/,/g, ""), 10);
      count += isNaN(parsed) ? 1000 : parsed;
    }
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : String(count);
  }, [classifications]);

  const sensitiveRecords = useMemo(() => {
    let count = 0;
    for (const c of classifications) {
      if (c.sensitivity === "Restricted" || c.sensitivity === "Confidential") {
        const parsed = parseInt(c.records.replace(/,/g, ""), 10);
        count += isNaN(parsed) ? 1000 : parsed;
      }
    }
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : String(count);
  }, [classifications]);

  const dataSourcesCount = useMemo(() => {
    return new Set(classifications.map((c) => c.source)).size || 1;
  }, [classifications]);

  const autoClassified = useMemo(() => {
    if (!classifications.length) return "0%";
    const avg = classifications.reduce((acc, c) => acc + c.confidence, 0) / classifications.length;
    return `${avg.toFixed(1)}%`;
  }, [classifications]);

  async function toggleStatus(item: Classification) {
    try {
      const res = await dlpApi.updateClassification(item.id, { active: !item.active });
      if (res.ok) {
        notify(`Classification "${item.name}" updated to ${!item.active ? "Active" : "Paused"}`);
        reload();
      }
    } catch {
      notify("Failed to update status on backend");
    }
  }

  async function deleteSelected() {
    if (!selected.length) return;
    try {
      await Promise.all(selected.map((id) => dlpApi.deleteClassification(id)));
      notify(`Deleted ${selected.length} classification(s) from backend`);
      setSelected([]);
      reload();
    } catch {
      notify("Failed to delete classifications from backend");
    }
  }

  function exportCsv() {
    const rows = [["Classification", "Source", "Owner", "Sensitivity", "Records", "Confidence", "Status"], ...filtered.map((item) => [item.name, item.source, item.owner, item.sensitivity, item.records, `${item.confidence}%`, item.active ? "Active" : "Paused"])];
    const blob = new Blob([rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "aepttasshield-classifications.csv"; link.click(); URL.revokeObjectURL(url); notify("Classification inventory exported");
  }

  return (
    <>
      <div>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Security Operations</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Data Classification</h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Discover, label and control sensitive information across your enterprise.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ApiBadge endpoint="/api/v1/classifications" latency={latency} />
            <Button variant="secondary" onClick={() => { reload(); notify("Classification data refreshed from backend"); }}>
              <RefreshCw size={15} /> Refresh
            </Button>
            <Button variant={live ? "primary" : "secondary"} onClick={() => setLive(!live)}>
              <Zap size={16} /> {live ? "Live monitor on" : "Live monitor off"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-danger/40 bg-danger-soft p-4 text-xs text-danger">
            <div>
              <p className="font-bold">Backend connection failed ({error})</p>
              <p className="mt-1 text-muted-foreground">Make sure the Express backend is running: <code className="rounded bg-field px-1.5 py-0.5 font-mono">cd backend && npm run dev</code></p>
            </div>
            <Button size="sm" variant="secondary" onClick={reload}><RefreshCw size={14} /> Retry</Button>
          </div>
        )}

        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard icon={FileSearch} label="Classified records" value={totalClassified} detail={`Across ${dataSourcesCount} connected sources`} tone="bg-primary/15 text-primary" />
          <MetricCard icon={FileKey} label="Sensitive records" value={sensitiveRecords} detail="Restricted or confidential" tone="bg-danger-soft text-danger" />
          <MetricCard icon={Cloud} label="Data sources" value={String(dataSourcesCount)} detail="All sources reporting" tone="bg-info-soft text-info" />
          <MetricCard icon={Bot} label="Auto-classified" value={autoClassified} detail="Model accuracy rating" tone="bg-success-soft text-success" />
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[1.15fr_1fr_.9fr]">
          <article className="rounded-lg border border-border bg-card p-5 shadow-panel">
            <div className="flex items-start justify-between">
              <div><h2 className="text-sm font-bold">Classification coverage</h2><p className="mt-1 text-xs text-muted-foreground">Enterprise data visibility</p></div>
              <SlidersHorizontal size={17} className="text-muted-foreground" />
            </div>
            <div className="mt-5 flex items-center gap-6">
              <DonutChart percent={classifications.length > 0 ? Math.round((classifications.filter((c) => c.active).length / classifications.length) * 100) : 0} />
              <div className="min-w-0 flex-1 space-y-3">
                {[
                  ["Classified", totalClassified, "bg-primary"],
                  ["Sensitive", sensitiveRecords, "bg-warning"],
                  ["Active policies", String(classifications.filter((c) => c.active).length), "bg-success"],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs text-muted-foreground"><span className={`size-2 rounded-full ${color}`} />{label}</span>
                    <span className="text-xs font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
          <article className="rounded-lg border border-border bg-card p-5 shadow-panel">
            <div><h2 className="text-sm font-bold">Sensitive data by type</h2><p className="mt-1 text-xs text-muted-foreground">Records detected in current classifications</p></div>
            <div className="mt-6 space-y-4">
              {[
                ["Restricted", `${classifications.filter((c) => c.sensitivity === "Restricted").length} types`, "w-[50%]"],
                ["Confidential", `${classifications.filter((c) => c.sensitivity === "Confidential").length} types`, "w-[35%]"],
                ["Internal", `${classifications.filter((c) => c.sensitivity === "Internal").length} types`, "w-[20%]"],
                ["Public", `${classifications.filter((c) => c.sensitivity === "Public").length} types`, "w-[10%]"],
              ].map(([label, value, width]) => (
                <div key={label}>
                  <div className="mb-1.5 flex justify-between text-xs"><span className="text-muted-foreground">{label}</span><span className="font-bold">{value}</span></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full bg-primary ${width}`} /></div>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-lg border border-border bg-card p-5 shadow-panel">
            <div className="flex items-start justify-between">
              <div><h2 className="text-sm font-bold">Recent scan activity</h2><p className="mt-1 text-xs text-muted-foreground">Live discovery pipeline</p></div>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-success"><span className="size-1.5 rounded-full bg-success" />LIVE</span>
            </div>
            <div className="mt-5 space-y-4">
              {classifications.slice(0, 3).map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><HardDrive size={14} /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3"><p className="truncate text-xs font-semibold">{item.source}</p><span className="text-[10px] text-muted-foreground">{item.scanned}</span></div>
                    <p className="mt-1 text-[10px] text-muted-foreground">{item.records} analyzed ({item.name})</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-4 overflow-hidden rounded-lg border border-border bg-card shadow-panel">
          <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-bold">Classification inventory</h2>
              <p className="mt-1 text-xs text-muted-foreground">Data served directly from Express backend at <code className="font-mono text-primary">/api/v1/classifications</code></p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.length > 0 && (
                <Button variant="danger" size="sm" onClick={deleteSelected}>
                  <Trash2 size={14} /> Delete selected ({selected.length})
                </Button>
              )}
              <Button variant="secondary" onClick={exportCsv}><Download size={15} /> Export</Button>
              <Button variant="primary" onClick={() => setShowModal(true)}><Plus size={16} /> New classification</Button>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-b border-border bg-secondary/25 p-4 sm:flex-row">
            <div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter inventory..." className="h-9 w-full rounded-md border border-input bg-field pl-9 pr-3 text-xs outline-none focus:border-primary" /></div>
            <div className="relative"><Filter size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><select value={sensitivity} onChange={(event) => setSensitivity(event.target.value)} className="h-9 min-w-44 appearance-none rounded-md border border-input bg-field pl-9 pr-8 text-xs outline-none focus:border-primary"><option>All sensitivities</option><option>Restricted</option><option>Confidential</option><option>Internal</option><option>Public</option></select></div>
          </div>

          {loading && !classifications.length ? (
            <TableSkeleton rows={5} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left">
                <thead>
                  <tr className="border-b border-border bg-secondary/30 text-[10px] uppercase tracking-wider text-muted-foreground">
                    <th className="w-12 px-4 py-3"><input type="checkbox" aria-label="Select all classifications" checked={selected.length === filtered.length && filtered.length > 0} onChange={(event) => setSelected(event.target.checked ? filtered.map((item) => item.id) : [])} className="accent-primary" /></th>
                    <th className="px-3 py-3">Classification</th>
                    <th className="px-3 py-3">Source</th>
                    <th className="px-3 py-3">Owner</th>
                    <th className="px-3 py-3">Sensitivity</th>
                    <th className="px-3 py-3">Records</th>
                    <th className="px-3 py-3">Confidence</th>
                    <th className="px-3 py-3">Last scan</th>
                    <th className="px-3 py-3">Status (Click to toggle)</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className="border-b border-border/70 text-xs transition-colors last:border-0 hover:bg-accent/50">
                      <td className="px-4 py-3.5"><input type="checkbox" aria-label={`Select ${item.name}`} checked={selected.includes(item.id)} onChange={() => setSelected((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])} className="accent-primary" /></td>
                      <td className="px-3 py-3.5"><p className="font-semibold">{item.name}</p><p className="mt-1 max-w-[250px] truncate text-[10px] text-muted-foreground">{item.description}</p></td>
                      <td className="px-3 py-3.5 text-muted-foreground">{item.source}</td>
                      <td className="px-3 py-3.5 text-muted-foreground">{item.owner}</td>
                      <td className="px-3 py-3.5"><StatusBadge level={item.sensitivity} /></td>
                      <td className="px-3 py-3.5 font-semibold">{item.records}</td>
                      <td className="px-3 py-3.5"><span className={item.confidence >= 95 ? "text-success" : item.confidence >= 90 ? "text-info" : "text-warning"}>{item.confidence}%</span></td>
                      <td className="px-3 py-3.5 text-muted-foreground">{item.scanned}</td>
                      <td className="px-3 py-3.5">
                        <button
                          type="button"
                          onClick={() => toggleStatus(item)}
                          className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs hover:bg-accent"
                          title="Click to toggle Active / Paused on backend"
                        >
                          <span className={`size-1.5 rounded-full ${item.active ? "bg-success" : "bg-muted-foreground"}`} />
                          <span className={item.active ? "font-semibold text-success" : "text-muted-foreground"}>{item.active ? "Active" : "Paused"}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="flex flex-col items-center px-5 py-14 text-center">
                  <Search size={28} className="text-muted-foreground" />
                  <p className="mt-3 text-sm font-bold">No classifications found</p>
                  <p className="mt-1 text-xs text-muted-foreground">Try changing your search or sensitivity filter, or add one using "+ New classification".</p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-[11px] text-muted-foreground">Showing {filtered.length} of {classifications.length} classifications from backend{selected.length > 0 ? ` · ${selected.length} selected` : ""}</p>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" className="size-8" aria-label="Previous page" disabled><ChevronLeft size={15} /></Button>
              <Button size="sm" variant="primary" className="size-8 px-0">1</Button>
              <Button size="icon" variant="ghost" className="size-8" aria-label="Next page" disabled><ChevronRight size={15} /></Button>
            </div>
          </div>
        </section>
      </div>

      {showModal && (
        <NewClassificationModal
          onClose={() => setShowModal(false)}
          onCreated={() => {
            reload();
            notify("New classification saved to backend");
          }}
        />
      )}
    </>
  );
}