import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Database, Lock, ShieldCheck, Workflow } from "lucide-react";
import { Button, Pill } from "./shared";

type Risk = "Low" | "Med" | "High";
type Flow = { id: string; time: string; source: string; system: string; process: string; target: string; transform: string; risk: Risk; trust: number; sensitivity: string; verified: boolean; knownEtl: boolean; resolution: string };

const sampleFlows: Flow[] = [
  { id: "L-01", time: "02:00:04", source: "Production DB", system: "PostgreSQL", process: "etl-daily-backup", target: "Backup Vault (S3)", transform: "AES-256 encryption", risk: "Low", trust: 99, sensitivity: "Restricted", verified: true, knownEtl: true, resolution: "" },
  { id: "L-02", time: "03:15:22", source: "Customer CRM", system: "Salesforce", process: "anonymizer-v3", target: "Customer Analytics Lake", transform: "SHA-256 hash · PII masked", risk: "Low", trust: 96, sensitivity: "Confidential", verified: true, knownEtl: true, resolution: "" },
  { id: "L-03", time: "09:41:10", source: "Production DB", system: "PostgreSQL", process: "user:r.mehta", target: "Personal Drive", transform: "None", risk: "High", trust: 18, sensitivity: "Restricted", verified: false, knownEtl: false, resolution: "" },
  { id: "L-04", time: "11:05:37", source: "HR Workspace", system: "Workday", process: "payroll-sync", target: "Payroll Engine", transform: "Tokenized IDs", risk: "Med", trust: 72, sensitivity: "Confidential", verified: false, knownEtl: false, resolution: "" },
];
const pipeline = [
  { name: "Production DB", kind: "Origin", icon: Database, badges: ["Encrypted"] },
  { name: "ETL Pipeline / Anonymizer", kind: "Processing", icon: Workflow, badges: ["Anonymized / Masked"] },
  { name: "Customer Analytics Lake", kind: "Destination", icon: ShieldCheck, badges: ["Authorized Pathway"] },
];
const sel = "h-9 rounded-md border border-input bg-field px-3 text-xs";

export function LineageProvenance({ onNotify }: { onNotify: (t: string) => void }) {
  const [flows, setFlows] = useState(sampleFlows);
  const [system, setSystem] = useState("All sources");
  const [process, setProcess] = useState("All processes");
  const [sens, setSens] = useState("All sensitivity");
  const [onlyUnverified, setOnlyUnverified] = useState(false);
  const [hideEtl, setHideEtl] = useState(false);
  const [activeId, setActiveId] = useState("L-03");

  const rows = useMemo(() => flows.filter(f => (system === "All sources" || f.system === system) && (process === "All processes" || f.process === process) && (sens === "All sensitivity" || f.sensitivity === sens) && (!onlyUnverified || !f.verified) && (!hideEtl || !f.knownEtl)), [flows, system, process, sens, onlyUnverified, hideEtl]);
  const active = flows.find(f => f.id === activeId) ?? flows[0]!;
  const resolve = (id: string, patch: Partial<Flow>, msg: string) => { setFlows(o => o.map(f => f.id === id ? { ...f, ...patch } : f)); onNotify(`${msg} — recorded in this browser only.`); };

  return <div className="space-y-4">
    <section className="rounded-lg border border-border bg-card p-4">
      <h2 className="text-sm font-bold">False-positive control bar</h2>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <select aria-label="Source system" className={sel} value={system} onChange={e => setSystem(e.target.value)}><option>All sources</option>{[...new Set(flows.map(f => f.system))].map(x => <option key={x}>{x}</option>)}</select>
        <select aria-label="User or process ID" className={sel} value={process} onChange={e => setProcess(e.target.value)}><option>All processes</option>{flows.map(f => <option key={f.id}>{f.process}</option>)}</select>
        <select aria-label="Data sensitivity" className={sel} value={sens} onChange={e => setSens(e.target.value)}>{["All sensitivity", "Restricted", "Confidential", "Internal", "Public"].map(x => <option key={x}>{x}</option>)}</select>
        <Button size="sm" variant={onlyUnverified ? "primary" : "secondary"} aria-pressed={onlyUnverified} onClick={() => setOnlyUnverified(!onlyUnverified)}>Show Only Unverified Flows</Button>
        <Button size="sm" variant={hideEtl ? "primary" : "secondary"} aria-pressed={hideEtl} onClick={() => setHideEtl(!hideEtl)}>Hide Known ETL Pathways</Button>
      </div>
    </section>

    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
      <section className="min-w-0 rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-bold">Verified pipeline (DAG)</h2>
        <div className="mt-4 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          {pipeline.map((n, i) => <div key={n.name} className="flex flex-1 flex-col items-center gap-2 md:flex-row">
            <div className="w-full flex-1 rounded-lg border border-primary/40 bg-accent p-3">
              <div className="flex items-center gap-2"><n.icon size={16} className="text-primary" /><span className="text-[10px] uppercase tracking-wider text-muted-foreground">{n.kind}</span></div>
              <p className="mt-1 text-sm font-semibold">{n.name}</p>
              <div className="mt-2 flex flex-wrap gap-1">{n.badges.map(b => <Pill key={b} label={b} tone="success" />)}</div>
            </div>
            {i < pipeline.length - 1 && <ArrowRight size={18} className="shrink-0 rotate-90 text-info md:rotate-0" />}
          </div>)}
        </div>
        <h3 className="mt-5 text-xs font-bold text-danger">Anomalous path</h3>
        <div className="mt-2 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          <div className="flex-1 rounded-lg border border-border bg-secondary p-3 text-sm font-semibold">Production DB</div>
          <ArrowRight size={18} className="shrink-0 rotate-90 self-center text-danger md:rotate-0" />
          <button onClick={() => setActiveId("L-03")} className="flex-1 rounded-lg border border-danger bg-danger-soft p-3 text-left text-sm font-semibold"><span className="flex items-center gap-2"><AlertTriangle size={15} className="text-danger" /> Personal Drive</span><span className="mt-1 block text-[11px] font-normal text-danger">Unverified · no transform applied</span></button>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">Green badges = authorized and sanitized. Red = movement outside a known business process.</p>
      </section>

      <aside className="space-y-3 rounded-lg border border-border bg-card p-4" aria-label="Context and anomaly resolution">
        <h2 className="text-sm font-bold">Context & resolution · {active.id}</h2>
        <div className="rounded-md border border-border bg-secondary/50 p-3 text-xs">
          <p className="font-semibold">Movement intent & compliance</p>
          <p className={`mt-1 flex items-center gap-1 ${active.verified ? "text-success" : "text-warning"}`}>{active.verified ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}{active.verified ? `${active.process === "etl-daily-backup" ? "Automated Daily ETL Backup" : "Whitelisted process"} - Verified Safe` : "No matching whitelisted business process"}</p>
        </div>
        <div className="rounded-md border border-border bg-secondary/50 p-3 text-xs">
          <p className="font-semibold">Sanitizer status</p>
          <p className="mt-1 flex items-center gap-1"><Lock size={13} className="text-primary" /> Transform applied: {active.transform} → Risk level: {active.transform === "None" ? <span className="text-danger">High</span> : <span className="text-success">Zero</span>}</p>
        </div>
        <div className="rounded-md border border-border bg-secondary/50 p-3 text-xs">
          <p className="font-semibold">False positive resolution</p>
          <p className="mt-1 text-muted-foreground">Process ID: <span className="font-mono">{active.process}</span></p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" variant="primary" onClick={() => resolve(active.id, { verified: true, knownEtl: true }, "Flow pattern white-listed")}>White-list Flow Pattern</Button>
            <Button size="sm" onClick={() => resolve(active.id, { resolution: "Suppressed" }, `Alerts suppressed for ${active.process}`)}>Suppress Alert for Process ID</Button>
          </div>
        </div>
      </aside>
    </div>

    <section className="rounded-lg border border-border bg-card p-4">
      <h2 className="text-sm font-bold">Lineage event log & provenance</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-xs">
          <thead className="text-muted-foreground"><tr>{["Timestamp", "Source engine", "Target egress", "Transformation", "Risk", "Trust score", "Resolution"].map(h => <th key={h} className="border-b border-border p-2 font-semibold">{h}</th>)}</tr></thead>
          <tbody>{rows.map(f => <tr key={f.id} onClick={() => setActiveId(f.id)} className={`cursor-pointer border-b border-border ${f.id === activeId ? "bg-accent" : ""}`}>
            <td className="p-2 font-mono">{f.time}</td>
            <td className="p-2">{f.source} <span className="text-muted-foreground">· {f.system}</span></td>
            <td className="p-2">{f.target}</td>
            <td className="p-2">{f.transform}</td>
            <td className="p-2"><Pill label={f.risk} tone={f.risk === "High" ? "danger" : f.risk === "Med" ? "warning" : "success"} /></td>
            <td className="p-2"><div className="flex items-center gap-2"><div className="h-1.5 w-16 rounded-full bg-muted"><div className={`h-full rounded-full ${f.trust > 80 ? "bg-success" : f.trust > 50 ? "bg-warning" : "bg-danger"}`} style={{ width: `${f.trust}%` }} /></div>{f.trust}%</div></td>
            <td className="p-2" onClick={e => e.stopPropagation()}>{f.resolution ? <Pill label={f.resolution} tone="muted" /> : <div className="flex gap-1"><Button size="sm" onClick={() => resolve(f.id, { resolution: "Authorized", verified: true }, "Marked as authorized flow")}>Mark Authorized Flow</Button><Button size="sm" variant="danger" onClick={() => resolve(f.id, { resolution: "Incident raised" }, "Incident raised")}>Raise Incident</Button></div>}</td>
          </tr>)}</tbody>
        </table>
        {!rows.length && <p className="py-6 text-center text-xs text-muted-foreground">No flows match these filters.</p>}
      </div>
    </section>
  </div>;
}
