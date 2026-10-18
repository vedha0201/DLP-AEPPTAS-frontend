import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Check,
  Cpu,
  Download,
  FileCheck2,
  Filter,
  Laptop,
  Radio,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sparkles,
  TrendingUp,
  Users,
  Wifi,
  X,
  type LucideIcon,
} from "lucide-react";
import { ApiBadge, Button, MetricCard, PageHeader, Panel, Pill, TableSkeleton } from "./shared";
import { useApi } from "./use-api";
import { dlpApi, monitorFeed, type Endpoint, type Incident, type MonitorEvent } from "./mock-api";

function severityTone(value: Incident["severity"]) {
  return value === "Critical" ? "danger" : value === "High" ? "warning" : value === "Medium" ? "info" : "muted";
}

function statusTone(value: Incident["status"]) {
  return value === "Open" ? "danger" : value === "Investigating" ? "warning" : value === "Contained" ? "info" : "success";
}

/* ------------------------------ Security overview ------------------------------ */

export function OverviewModule({ onNavigate }: { onNavigate: (view: string) => void }) {
  const incidents = useApi(dlpApi.getIncidents);
  return (
    <div className="space-y-4">
      <PageHeader eyebrow="Security Operations" title="Security Overview" description="Consolidated posture across classification, incidents, endpoints and compliance."
        actions={<ApiBadge endpoint="/api/v1/incidents" latency={incidents.latency} />} />
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard icon={ShieldCheck} label="Protection score" value="92" detail="Up 4 points this week" tone="bg-success-soft text-success" />
        <MetricCard icon={Siren} label="Open incidents" value="2" detail="1 critical awaiting triage" tone="bg-danger-soft text-danger" delta="-12%" />
        <MetricCard icon={Laptop} label="Managed endpoints" value="1,248" detail="1,192 fully protected" tone="bg-info-soft text-info" />
        <MetricCard icon={FileCheck2} label="Compliance" value="83%" detail="5 frameworks tracked" tone="bg-primary/15 text-primary" />
      </section>
      <section className="grid gap-4 xl:grid-cols-3">
        <Panel title="Risk by business unit" subtitle="Weighted DLP risk index" className="xl:col-span-2">
          <div className="space-y-4">
            {[["Finance", 92], ["Engineering", 74], ["People", 55], ["Sales", 48], ["Marketing", 31]].map(([label, value]) => (
              <div key={label as string}>
                <div className="mb-1.5 flex justify-between text-xs"><span className="text-muted-foreground">{label}</span><span className="font-bold">{value}</span></div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Jump to module" subtitle="Wider DLP workspace">
          <div className="grid gap-2">
            {([["Data Classification", Sparkles], ["Incidents", AlertTriangle], ["Endpoints", Laptop], ["Reporting & Analytics", BarChart3], ["Compliance", FileCheck2], ["Real-Time Monitoring", Radio]] as [string, LucideIcon][]).map(([name, Icon]) => (
              <button key={name} onClick={() => onNavigate(name)} className="flex h-11 items-center gap-3 rounded-md border border-border bg-secondary/40 px-3 text-left text-xs font-semibold transition-colors hover:bg-accent">
                <Icon size={16} className="text-primary" />{name}
              </button>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

/* ------------------------------ Incident management ------------------------------ */

export function IncidentsModule({ notify }: { notify: (message: string) => void }) {
  const { data, loading, latency, reload } = useApi(dlpApi.getIncidents);
  const [rows, setRows] = useState<Incident[]>([]);
  const [severity, setSeverity] = useState("All severities");
  const [status, setStatus] = useState("All statuses");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Incident | null>(null);

  useEffect(() => { if (data) setRows(data); }, [data]);

  const filtered = useMemo(() => rows.filter((item) =>
    (severity === "All severities" || item.severity === severity) &&
    (status === "All statuses" || item.status === status) &&
    `${item.id} ${item.title} ${item.user} ${item.policy}`.toLowerCase().includes(query.toLowerCase())), [rows, severity, status, query]);

  async function updateStatus(id: string, next: Incident["status"]) {
    // Optimistic update for instant UI feedback
    setRows((current) => current.map((item) => (item.id === id ? { ...item, status: next } : item)));
    setOpen(null);
    try {
      await dlpApi.updateIncident(id, { status: next });
      notify(`${id} marked ${next.toLowerCase()}`);
    } catch {
      // Rollback on failure by reloading from backend
      reload();
      notify(`Failed to update ${id} — changes reverted`);
    }
  }

  return (
    <div className="space-y-4">
      <PageHeader eyebrow="Response" title="Incident Management" description="Triage, assign and resolve data-loss incidents raised by policy engines."
        actions={<><ApiBadge endpoint="/api/v1/incidents" latency={latency} /><Button onClick={reload}><RefreshCw size={15} /> Refresh</Button></>} />
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard icon={Siren} label="Critical" value={String(rows.filter((item) => item.severity === "Critical").length)} detail="Immediate action required" tone="bg-danger-soft text-danger" delta="+2" />
        <MetricCard icon={AlertTriangle} label="Open" value={String(rows.filter((item) => item.status === "Open").length)} detail="Awaiting triage" tone="bg-warning-soft text-warning" delta="-1" />
        <MetricCard icon={Activity} label="Investigating" value={String(rows.filter((item) => item.status === "Investigating").length)} detail="Analyst assigned" tone="bg-info-soft text-info" delta="0%" />
        <MetricCard icon={Check} label="Resolved (7d)" value="34" detail="Mean time to close 3.2 hrs" tone="bg-success-soft text-success" />
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-card shadow-panel">
        <div className="flex flex-col gap-3 border-b border-border bg-secondary/25 p-4 sm:flex-row">
          <div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search incidents, users, policies..." aria-label="Search incidents" className="h-9 w-full rounded-md border border-input bg-field pl-9 pr-3 text-xs outline-none focus:border-primary" /></div>
          <select value={severity} onChange={(event) => setSeverity(event.target.value)} aria-label="Filter by severity" className="h-9 min-w-40 rounded-md border border-input bg-field px-3 text-xs outline-none focus:border-primary"><option>All severities</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status" className="h-9 min-w-40 rounded-md border border-input bg-field px-3 text-xs outline-none focus:border-primary"><option>All statuses</option><option>Open</option><option>Investigating</option><option>Contained</option><option>Resolved</option></select>
        </div>
        {loading ? <TableSkeleton /> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead><tr className="border-b border-border bg-secondary/30 text-[10px] uppercase tracking-wider text-muted-foreground"><th className="px-4 py-3">Incident</th><th className="px-3 py-3">Policy</th><th className="px-3 py-3">User</th><th className="px-3 py-3">Channel</th><th className="px-3 py-3">Severity</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Raised</th><th className="px-3 py-3">Action</th></tr></thead>
              <tbody>{filtered.map((item) => (
                <tr key={item.id} className="border-b border-border/70 text-xs last:border-0 hover:bg-accent/50">
                  <td className="px-4 py-3.5"><p className="font-semibold">{item.id}</p><p className="mt-1 max-w-[260px] truncate text-[10px] text-muted-foreground">{item.title}</p></td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.policy}</td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.user}</td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.channel}</td>
                  <td className="px-3 py-3.5"><Pill label={item.severity} tone={severityTone(item.severity)} /></td>
                  <td className="px-3 py-3.5"><Pill label={item.status} tone={statusTone(item.status)} /></td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.raised}</td>
                  <td className="px-3 py-3.5"><Button size="sm" onClick={() => setOpen(item)}>Investigate</Button></td>
                </tr>))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="px-5 py-12 text-center text-xs text-muted-foreground">No incidents match the current filters.</p>}
          </div>
        )}
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4" role="dialog" aria-modal="true" aria-label={`Incident ${open.id}`}>
          <div className="w-full max-w-lg rounded-lg border border-border bg-popover shadow-modal">
            <div className="flex items-start justify-between border-b border-border px-5 py-4">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{open.id}</p><h2 className="mt-1 text-lg font-bold">{open.title}</h2></div>
              <Button size="icon" variant="ghost" aria-label="Close incident" onClick={() => setOpen(null)}><X size={18} /></Button>
            </div>
            <div className="space-y-2 p-5">
              {[["Policy", open.policy], ["User", open.user], ["Channel", open.channel], ["Data type", open.dataType], ["Assignee", open.assignee], ["Raised", open.raised]].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 rounded-md border border-border bg-secondary/40 px-4 py-2.5"><span className="text-xs text-muted-foreground">{label}</span><span className="text-right text-xs font-semibold">{value}</span></div>
              ))}
            </div>
            <div className="flex flex-wrap justify-end gap-2 border-t border-border px-5 py-4">
              <Button variant="danger" onClick={() => updateStatus(open.id, "Investigating")}><ShieldAlert size={15} /> Escalate</Button>
              <Button onClick={() => updateStatus(open.id, "Contained")}>Contain</Button>
              <Button variant="primary" onClick={() => updateStatus(open.id, "Resolved")}><Check size={15} /> Resolve</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Endpoint management ------------------------------ */

export function EndpointsModule({ notify }: { notify: (message: string) => void }) {
  const { data, loading, latency, reload } = useApi(dlpApi.getEndpoints);
  const [rows, setRows] = useState<Endpoint[]>([]);
  const [status, setStatus] = useState("All statuses");
  const [query, setQuery] = useState("");
  useEffect(() => { if (data) setRows(data); }, [data]);

  const filtered = rows.filter((item) => (status === "All statuses" || item.status === status) && `${item.host} ${item.user} ${item.location}`.toLowerCase().includes(query.toLowerCase()));

  async function act(item: Endpoint, action: string) {
    // Optimistic update for Isolate
    if (action === "Isolate") setRows((current) => current.map((row) => (row.id === item.id ? { ...row, status: "Offline" } : row)));
    try {
      await dlpApi.triggerEndpointAction(item.id, action);
      notify(`${action} applied to ${item.host}`);
    } catch {
      reload();
      notify(`Failed to send ${action} to ${item.host} — reverted`);
    }
  }

  return (
    <div className="space-y-4">
      <PageHeader eyebrow="Agents" title="Endpoint Management" description="Agent health, policy enforcement and remote containment for managed devices."
        actions={<><ApiBadge endpoint="/api/v1/endpoints" latency={latency} /><Button onClick={reload}><RefreshCw size={15} /> Sync agents</Button></>} />
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard icon={Laptop} label="Total endpoints" value="1,248" detail="Across 9 locations" tone="bg-primary/15 text-primary" />
        <MetricCard icon={ShieldCheck} label="Protected" value="1,192" detail="Agent 4.8.2 current" tone="bg-success-soft text-success" />
        <MetricCard icon={ShieldAlert} label="At risk" value="38" detail="Policy drift detected" tone="bg-warning-soft text-warning" delta="+5" />
        <MetricCard icon={Wifi} label="Offline > 24h" value="18" detail="Pending re-enrolment" tone="bg-danger-soft text-danger" delta="-3" />
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-card shadow-panel">
        <div className="flex flex-col gap-3 border-b border-border bg-secondary/25 p-4 sm:flex-row">
          <div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search hosts, users, sites..." aria-label="Search endpoints" className="h-9 w-full rounded-md border border-input bg-field pl-9 pr-3 text-xs outline-none focus:border-primary" /></div>
          <div className="relative"><Filter size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter endpoints" className="h-9 min-w-44 appearance-none rounded-md border border-input bg-field pl-9 pr-8 text-xs outline-none focus:border-primary"><option>All statuses</option><option>Protected</option><option>At risk</option><option>Offline</option></select></div>
        </div>
        {loading ? <TableSkeleton /> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[940px] text-left">
              <thead><tr className="border-b border-border bg-secondary/30 text-[10px] uppercase tracking-wider text-muted-foreground"><th className="px-4 py-3">Host</th><th className="px-3 py-3">User</th><th className="px-3 py-3">OS</th><th className="px-3 py-3">Agent</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Policy compliance</th><th className="px-3 py-3">Last seen</th><th className="px-3 py-3">Actions</th></tr></thead>
              <tbody>{filtered.map((item) => (
                <tr key={item.id} className="border-b border-border/70 text-xs last:border-0 hover:bg-accent/50">
                  <td className="px-4 py-3.5"><p className="font-semibold">{item.host}</p><p className="mt-1 text-[10px] text-muted-foreground">{item.location}</p></td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.user}</td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.os}</td>
                  <td className="px-3 py-3.5 text-muted-foreground">v{item.agent}</td>
                  <td className="px-3 py-3.5"><Pill label={item.status} tone={item.status === "Protected" ? "success" : item.status === "At risk" ? "warning" : "muted"} /></td>
                  <td className="px-3 py-3.5"><div className="flex items-center gap-2"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${item.compliance >= 90 ? "bg-success" : item.compliance >= 70 ? "bg-warning" : "bg-danger"}`} style={{ width: `${item.compliance}%` }} /></div><span className="font-semibold">{item.compliance}%</span></div></td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.lastSeen}</td>
                  <td className="px-3 py-3.5"><div className="flex gap-1.5"><Button size="sm" onClick={() => act(item, "Policy push")}>Push policy</Button><Button size="sm" variant="danger" onClick={() => act(item, "Isolate")}>Isolate</Button></div></td>
                </tr>))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="px-5 py-12 text-center text-xs text-muted-foreground">No endpoints match the current filters.</p>}
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------ Reporting & analytics ------------------------------ */

export function ReportingModule({ notify }: { notify: (message: string) => void }) {
  const { data, loading, latency } = useApi(dlpApi.getReports);
  const [range, setRange] = useState("Last 30 days");

  function exportReport(format: string) {
    notify(`${format} report queued for ${range} (POST /api/v1/analytics/exports)`);
  }

  return (
    <div className="space-y-4">
      <PageHeader eyebrow="Intelligence" title="Reporting & Analytics" description="Trend analysis, channel breakdowns and exportable executive reporting."
        actions={<>
          <ApiBadge endpoint="/api/v1/analytics/reports" latency={latency} />
          <select value={range} onChange={(event) => setRange(event.target.value)} aria-label="Reporting period" className="h-10 rounded-md border border-input bg-field px-3 text-sm outline-none focus:border-primary"><option>Last 7 days</option><option>Last 30 days</option><option>Last quarter</option><option>Year to date</option></select>
          <Button onClick={() => exportReport("CSV")}><Download size={15} /> CSV</Button>
          <Button variant="primary" onClick={() => exportReport("PDF")}><Download size={15} /> PDF</Button>
        </>} />
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard icon={TrendingUp} label="Policy violations" value="1,204" detail={range} tone="bg-primary/15 text-primary" delta="-6.2%" />
        <MetricCard icon={ShieldCheck} label="Blocked transfers" value="486" detail="Prevented data loss events" tone="bg-success-soft text-success" />
        <MetricCard icon={Users} label="Repeat offenders" value="17" detail="Users with 3+ violations" tone="bg-warning-soft text-warning" delta="+2" />
        <MetricCard icon={Cpu} label="Scan throughput" value="4.2M" detail="Objects analysed" tone="bg-info-soft text-info" />
      </section>

      {loading || !data ? <div className="rounded-lg border border-border bg-card p-6 shadow-panel"><TableSkeleton rows={6} /></div> : (
        <section className="grid gap-4 xl:grid-cols-3">
          <Panel title="Violation trend" subtitle={`Monthly incident volume · ${range}`} className="xl:col-span-2">
            <div className="flex h-44 items-end gap-2">
              {data.trend.map((value, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t bg-primary/80 transition-all hover:bg-primary" style={{ height: `${value}%` }} title={`${value} incidents`} />
                  <span className="text-[9px] text-muted-foreground">{["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][index]}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Violations by channel" subtitle="Share of detections">
            <div className="space-y-4">
              {data.channels.map(([label, value]) => (
                <div key={label}>
                  <div className="mb-1.5 flex justify-between text-xs"><span className="text-muted-foreground">{label}</span><span className="font-bold">{value}%</span></div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} /></div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Departmental risk" subtitle="Violations per 100 users" className="xl:col-span-3">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-xs">
                <thead><tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground"><th className="py-3">Department</th><th className="py-3">Risk index</th><th className="py-3">Trend</th><th className="py-3">Top data type</th></tr></thead>
                <tbody>{data.departments.map(([label, value], index) => (
                  <tr key={label} className="border-b border-border/70 last:border-0"><td className="py-3 font-semibold">{label}</td><td className="py-3">{value}</td><td className="py-3"><Pill label={index % 2 === 0 ? "Rising" : "Falling"} tone={index % 2 === 0 ? "warning" : "success"} /></td><td className="py-3 text-muted-foreground">{["Payment data", "Source code", "Employee records", "Customer PII", "Campaign assets"][index]}</td></tr>
                ))}</tbody>
              </table>
            </div>
          </Panel>
        </section>
      )}
    </div>
  );
}

/* ------------------------------ Compliance ------------------------------ */

export function ComplianceModule({ notify }: { notify: (message: string) => void }) {
  const { data, loading, latency } = useApi(dlpApi.getCompliance);
  const [framework, setFramework] = useState("All frameworks");
  const rows = (data ?? []).filter((item) => framework === "All frameworks" || item.framework === framework);

  return (
    <div className="space-y-4">
      <PageHeader eyebrow="Governance" title="Compliance" description="Framework coverage, control status and audit evidence for regulated data."
        actions={<><ApiBadge endpoint="/api/v1/compliance/controls" latency={latency} /><Button variant="primary" onClick={() => notify("Audit evidence pack generated (POST /api/v1/compliance/evidence)")}><Download size={15} /> Evidence pack</Button></>} />
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard icon={FileCheck2} label="Overall compliance" value="83%" detail="Across 5 frameworks" tone="bg-primary/15 text-primary" />
        <MetricCard icon={Check} label="Controls compliant" value="3" detail="Fully evidenced" tone="bg-success-soft text-success" />
        <MetricCard icon={AlertTriangle} label="Partial" value="1" detail="Remediation in progress" tone="bg-warning-soft text-warning" delta="0%" />
        <MetricCard icon={ShieldAlert} label="Gaps" value="1" detail="Requires owner action" tone="bg-danger-soft text-danger" delta="+1" />
      </section>
      <section className="overflow-hidden rounded-lg border border-border bg-card shadow-panel">
        <div className="flex flex-col gap-3 border-b border-border bg-secondary/25 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold">Control register</p>
          <select value={framework} onChange={(event) => setFramework(event.target.value)} aria-label="Filter by framework" className="h-9 min-w-48 rounded-md border border-input bg-field px-3 text-xs outline-none focus:border-primary"><option>All frameworks</option><option>GDPR</option><option>PCI DSS 4.0</option><option>HIPAA</option><option>ISO 27001</option><option>DPDP Act</option></select>
        </div>
        {loading ? <TableSkeleton /> : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left">
              <thead><tr className="border-b border-border bg-secondary/30 text-[10px] uppercase tracking-wider text-muted-foreground"><th className="px-4 py-3">Framework</th><th className="px-3 py-3">Control</th><th className="px-3 py-3">Requirement</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Score</th><th className="px-3 py-3">Evidence</th><th className="px-3 py-3">Reviewed</th></tr></thead>
              <tbody>{rows.map((item) => (
                <tr key={`${item.framework}-${item.control}`} className="border-b border-border/70 text-xs last:border-0 hover:bg-accent/50">
                  <td className="px-4 py-3.5 font-semibold">{item.framework}</td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.control}</td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.requirement}</td>
                  <td className="px-3 py-3.5"><Pill label={item.status} tone={item.status === "Compliant" ? "success" : item.status === "Partial" ? "warning" : "danger"} /></td>
                  <td className="px-3 py-3.5 font-semibold">{item.score}%</td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.evidence}</td>
                  <td className="px-3 py-3.5 text-muted-foreground">{item.reviewed}</td>
                </tr>))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------ Real-time monitoring ------------------------------ */

export function MonitoringModule() {
  const { latency } = useApi(dlpApi.getMonitorFeed);
  const [live, setLive] = useState(true);
  const [events, setEvents] = useState<MonitorEvent[]>(monitorFeed);

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      setEvents((current) => {
        const seed = monitorFeed[Math.floor(Math.random() * monitorFeed.length)]!;
        const now = new Date();
        const next: MonitorEvent = { ...seed, id: `EVT-${Math.floor(Math.random() * 90000 + 10000)}`, time: now.toTimeString().slice(0, 8) };
        return [next, ...current].slice(0, 14);
      });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [live]);

  return (
    <div className="space-y-4">
      <PageHeader eyebrow="Operations" title="Real-Time Monitoring" description="Streaming view of data movement decisions across every enforcement point."
        actions={<><ApiBadge endpoint="/api/v1/monitoring/events" latency={latency} /><Button variant={live ? "primary" : "secondary"} onClick={() => setLive(!live)}><Radio size={16} /> {live ? "Streaming" : "Paused"}</Button></>} />
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard icon={Activity} label="Events / minute" value="412" detail="Across 1,248 agents" tone="bg-primary/15 text-primary" />
        <MetricCard icon={ShieldCheck} label="Blocked today" value="96" detail="Policy enforced in-line" tone="bg-success-soft text-success" />
        <MetricCard icon={AlertTriangle} label="High-risk actions" value="23" detail="Risk score above 70" tone="bg-warning-soft text-warning" delta="+4" />
        <MetricCard icon={Wifi} label="Collector health" value="100%" detail="6 collectors online" tone="bg-info-soft text-info" delta="0%" />
      </section>
      <Panel title="Live event stream" subtitle={live ? "Updating every 3 seconds" : "Stream paused"} action={<span className="flex items-center gap-1.5 text-[10px] font-bold text-success"><span className={`size-1.5 rounded-full bg-success ${live ? "animate-pulse" : ""}`} />{live ? "LIVE" : "IDLE"}</span>}>
        <div className="max-h-[440px] space-y-2 overflow-y-auto pr-1">
          {events.map((event, index) => (
            <div key={`${event.id}-${index}`} className="flex flex-col gap-2 rounded-md border border-border bg-secondary/35 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">{event.actor} · {event.action}</p>
                <p className="mt-1 truncate text-[10px] text-muted-foreground">{event.destination} · {event.classification} · {event.time}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className={`font-mono text-[10px] ${event.risk > 70 ? "text-danger" : event.risk > 40 ? "text-warning" : "text-muted-foreground"}`}>risk {event.risk}</span>
                <Pill label={event.verdict} tone={event.verdict === "Blocked" ? "danger" : event.verdict === "Quarantined" ? "warning" : event.verdict === "Alerted" ? "info" : "success"} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ------------------------------ Generic module shell ------------------------------ */

export function ModulePlaceholder({ name, icon: Icon, description, capabilities }: { name: string; icon: LucideIcon; description: string; capabilities: string[] }) {
  return (
    <div className="space-y-4">
      <PageHeader eyebrow="DLP Workspace" title={name} description={description} />
      <div className="rounded-lg border border-border bg-card p-8 text-center shadow-panel">
        <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-primary/15 text-primary"><Icon size={24} /></div>
        <h2 className="mt-5 text-lg font-bold">{name} workspace</h2>
        <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-muted-foreground">This screen is part of the wider DLP navigation. Interface scope for this prototype covers the modules below; data services are supplied by the local sample API layer.</p>
        <div className="mx-auto mt-6 grid max-w-xl gap-2 sm:grid-cols-2">
          {capabilities.map((item) => (
            <div key={item} className="flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2.5 text-left text-xs"><Check size={14} className="shrink-0 text-success" />{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
