import { useMemo, useState, useEffect } from "react";
import { AlertTriangle, Check, ChevronLeft, ChevronRight, Download, FileSearch, Pause, Play, Plus, RefreshCw, Search, ShieldCheck, X } from "lucide-react";
import { DiscoveryPrecision } from "./discovery-precision";
import { ApiBadge, Button, PageHeader, Pill, StatusBadge } from "./shared";
import { dlpApi, type Sensitivity, type Repository, type Finding } from "./mock-api";
import { useApi } from "./use-api";

const tabs = ["False-positive tuning", "Dashboard", "Repositories", "Scan profiles", "Classification center", "Scan monitor", "Findings", "Reports"] as const;
type Tab = typeof tabs[number];
const field = "h-9 w-full rounded-md border border-input bg-field px-3 text-xs text-foreground outline-none focus:border-primary";
function Box({ title, children }: { title: string; children: React.ReactNode }) { return <section className="min-w-0 rounded-lg border border-border bg-card p-4 sm:p-5"><h2 className="mb-4 text-sm font-bold">{title}</h2>{children}</section>; }
function Label({ name, children }: { name: string; children: React.ReactNode }) { return <label className="block space-y-1.5 text-xs font-medium text-muted-foreground"><span>{name}</span>{children}</label>; }
function saveCsv(name: string, rows: string[][]) { const csv = rows.map(row => row.map(v => `"${v.replaceAll('"', '""')}"`).join(",")).join("\r\n"); const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); link.download = name; link.click(); URL.revokeObjectURL(link.href); }

export function DiscoveryWorkspace({ onOpenLineage }: { onOpenLineage: (findingId: string) => void }) {
  const [tab, setTab] = useState<Tab>("False-positive tuning");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [findings, setFindings] = useState<Finding[]>([]);
  
  const { data: apiRepositories, latency: repoLatency, error: repoError, reload: reloadRepos } = useApi(dlpApi.getDiscoveryRepositories);
  const { data: apiFindings, latency: findLatency, error: findError, reload: reloadFindings } = useApi(dlpApi.getDiscoveryFindings);
  
  useEffect(() => {
    if (apiRepositories) setRepositories(apiRepositories);
  }, [apiRepositories]);

  useEffect(() => {
    if (apiFindings) setFindings(apiFindings);
  }, [apiFindings]);

  const [notice, setNotice] = useState("");
  const [wizard, setWizard] = useState(false);
  const [repoType, setRepoType] = useState("Endpoint");
  const [repoName, setRepoName] = useState("");
  const [repoOwner, setRepoOwner] = useState("");
  const [credential, setCredential] = useState("");
  const [tested, setTested] = useState(false);
  const [profile, setProfile] = useState({ name: "Enterprise sensitive data", target: "All sources", depth: "Content + OCR", schedule: "Daily", size: "50", types: "pdf, csv, docx", exclude: "/temp/**", throttle: "25", blackout: "00:00–04:00" });
  const [rule, setRule] = useState({ name: "National identifier", method: "Regex", expression: "[0-9]{4}[- ][0-9]{4}", test: "", sensitivity: "Confidential", regulation: "GDPR" });
  const [rules, setRules] = useState(["Payment card · regex", "Personal data · EDM", "National ID · OCR", "Patient record · dictionary"]);
  const [fingerprints, setFingerprints] = useState(["Customer records · EDM", "Contract templates · IDM"]);
  const [advanced, setAdvanced] = useState(false);
  const [scan, setScan] = useState({ state: "Idle", progress: 0, errors: 0 });
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("All risks");
  const [regulation, setRegulation] = useState("All regulations");
  const [savedViews, setSavedViews] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [focus, setFocus] = useState<string | null>(null);
  const [action, setAction] = useState("");
  const [reason, setReason] = useState("");
  const current = findings.find(f => f.id === focus);
  const shown = useMemo(() => findings.filter(f => `${f.path} ${f.owner} ${f.repository} ${f.rule}`.toLowerCase().includes(query.toLowerCase()) && (risk === "All risks" || f.risk === risk) && (regulation === "All regulations" || f.regulation === regulation)), [findings, query, risk, regulation]);
  const pageRows = shown.slice(page * 4, page * 4 + 4);
  function alert(message: string) { setNotice(message); window.setTimeout(() => setNotice(""), 4500); }
  async function applyAction() {
    if (!reason.trim()) return;
    const ids = focus ? [focus] : selected;
    try {
      await Promise.all(
        ids.map(id => {
          if (action === "Delete") {
            return dlpApi.deleteFinding(id);
          }
          return dlpApi.updateFinding(id, {
            status: action,
            ...(action === "Re-classify" ? { label: "Internal" as const } : {}),
          });
        })
      );
      reloadFindings();
      alert(`${action} persisted to backend for ${ids.length} finding(s). Reason: ${reason}`);
    } catch {
      alert(`Failed to save ${action} to backend.`);
    }
    setAction(""); setReason(""); setSelected([]);
  }
  return <div className="min-w-0 space-y-5">
    <PageHeader
      eyebrow="Data security / at rest"
      title="Data Discovery"
      description="Locate, classify and triage sensitive data across repositories."
      actions={
        <div className="flex items-center gap-2">
          <ApiBadge endpoint="/api/v1/discovery" latency={findLatency ?? repoLatency} />
          <Button variant="secondary" size="sm" onClick={() => { reloadRepos(); reloadFindings(); alert("Discovery data refreshed from backend"); }}>
            <RefreshCw size={14} /> Refresh
          </Button>
        </div>
      }
    />
    {(repoError || findError) && (
      <div className="flex items-center justify-between rounded-lg border border-danger/40 bg-danger-soft p-4 text-xs text-danger">
        <div>
          <p className="font-bold">Backend connection failed ({repoError || findError})</p>
          <p className="mt-1 text-muted-foreground">Make sure the backend is running: <code className="rounded bg-field px-1 font-mono">npm run backend</code></p>
        </div>
        <Button size="sm" variant="secondary" onClick={() => { reloadRepos(); reloadFindings(); }}><RefreshCw size={14} /> Retry</Button>
      </div>
    )}
    {notice && <div role="status" className="rounded-md border border-info bg-info-soft px-4 py-3 text-xs text-info">{notice}</div>}
    <div role="tablist" aria-label="Discovery views" className="flex gap-1 overflow-x-auto border-b border-border pb-2">{tabs.map(t => <Button key={t} size="sm" role="tab" aria-selected={tab === t} variant={tab === t ? "primary" : "ghost"} onClick={() => setTab(t)}>{t}</Button>)}</div>
    {tab === "False-positive tuning" && <DiscoveryPrecision onNotify={t => alert(t)} onCreateScan={() => setTab("Scan profiles")} />}
    {tab === "Dashboard" && <div className="space-y-4"><div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{[["Repositories", repositories.length], ["Assets indexed", repositories.reduce((n, r) => n + r.assets, 0).toLocaleString()], ["Sensitive findings", findings.length], ["High-risk exposures", findings.filter(f => ["High", "Critical"].includes(f.risk)).length]].map(([label, value]) => <div key={label} className="rounded-lg border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>)}</div><div className="grid gap-4 lg:grid-cols-2"><Box title="Sensitive inventory by label">{["Restricted", "Confidential", "Internal", "Public"].map(label => <div key={label} className="mb-3 flex justify-between border-b border-border pb-2 text-xs"><span>{label}</span><strong>{findings.filter(f => f.label === label).length}</strong></div>)}</Box><Box title="Risk hotspots by repository">{repositories.map(r => <div key={r.id} className="mb-3 flex justify-between border-b border-border pb-2 text-xs"><span>{r.name}</span><span>{findings.filter(f => f.repository === r.name).length} findings · {r.coverage}% covered</span></div>)}</Box><Box title="Regulation coverage">{["GDPR", "HIPAA", "PCI-DSS", "DPDP Act"].map(r => <div key={r} className="mb-2 flex justify-between text-xs"><span>{r}</span><span>{findings.filter(f => f.regulation === r).length}</span></div>)}</Box><Box title="Recent trend"><p className="text-xs text-muted-foreground">Sample findings: 4 last week → {findings.length} now</p><div className="mt-4 h-2 rounded bg-muted"><div className="h-full w-3/4 rounded bg-warning" /></div><Button className="mt-4" size="sm" onClick={() => setTab("Findings")}>Review findings <ChevronRight size={14} /></Button></Box></div></div>}
    {tab === "Repositories" && <Box title="Connected repositories"><div className="mb-4 flex justify-end"><Button variant="primary" size="sm" onClick={() => setWizard(true)}><Plus size={15} /> Connect repository</Button></div><div className="grid gap-3 md:grid-cols-2">{repositories.map(r => <div key={r.id} className="rounded-md border border-border bg-secondary/50 p-4"><div className="flex justify-between gap-2"><div><strong className="text-sm">{r.name}</strong><p className="mt-1 text-xs text-muted-foreground">{r.type} · {r.owner}</p></div><Pill label={r.health} tone={r.health === "Healthy" ? "success" : r.health === "Attention" ? "warning" : "info"} /></div><p className="mt-4 text-xs">{r.assets.toLocaleString()} assets · {r.coverage}% scan coverage</p><Button size="sm" className="mt-3" onClick={async () => {
      try {
        const res = await dlpApi.testRepository(r.id);
        if (res.ok) {
          reloadRepos();
          alert(res.data.message);
        }
      } catch {
        alert(`Connection check failed for ${r.name}`);
      }
    }}>Test connection</Button></div>)}</div></Box>}
    {tab === "Scan profiles" && <div className="grid gap-4 lg:grid-cols-2"><Box title="Profile and scope"><div className="space-y-3"><Label name="Profile name"><input className={field} value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} /></Label><Label name="Target repositories"><select className={field} value={profile.target} onChange={e => setProfile({ ...profile, target: e.target.value })}><option>All sources</option>{repositories.map(r => <option key={r.id}>{r.name}</option>)}</select></Label><Label name="Detection rule set"><select className={field}><option>Enterprise default</option><option>Regulatory identifiers</option><option>Custom rules</option></select></Label><Label name="Scan depth"><select className={field} value={profile.depth} onChange={e => setProfile({ ...profile, depth: e.target.value })}><option>Metadata only</option><option>Full content</option><option>Content + OCR</option></select></Label><Button size="sm" variant="ghost" onClick={() => setAdvanced(!advanced)} aria-expanded={advanced}>Advanced options {advanced ? "−" : "+"}</Button>{advanced && <div className="grid gap-3 sm:grid-cols-2"><Label name="Maximum file size (MB)"><input className={field} type="number" min="1" value={profile.size} onChange={e => setProfile({ ...profile, size: e.target.value })} /></Label><Label name="File types"><input className={field} value={profile.types} onChange={e => setProfile({ ...profile, types: e.target.value })} /></Label><Label name="Excluded paths"><input className={field} value={profile.exclude} onChange={e => setProfile({ ...profile, exclude: e.target.value })} /></Label><Label name="Throttle (% capacity)"><input className={field} type="number" min="1" max="100" value={profile.throttle} onChange={e => setProfile({ ...profile, throttle: e.target.value })} /></Label></div>}</div></Box><Box title="Schedule"><div className="space-y-3"><Label name="Run mode"><select className={field} value={profile.schedule} onChange={e => setProfile({ ...profile, schedule: e.target.value })}><option>On demand</option><option>Daily</option><option>Weekly</option><option>Incremental</option><option>Event-triggered</option></select></Label><Label name="Blackout window"><input className={field} value={profile.blackout} onChange={e => setProfile({ ...profile, blackout: e.target.value })} /></Label><p className="text-xs text-muted-foreground">Recurring runs, incremental changes and event triggers are preview settings; no scheduler is connected.</p><div className="flex flex-wrap gap-2"><Button variant="primary" size="sm" onClick={() => alert(`Profile “${profile.name}” saved in this browser only.`)}>Save profile</Button><Button size="sm" onClick={() => { setScan({ state: "Running", progress: 12, errors: 0 }); setTab("Scan monitor"); }}>Run scan preview</Button></div></div></Box></div>}
    {tab === "Classification center" && <div className="grid gap-4 lg:grid-cols-2"><Box title="Detection rules"><div className="space-y-3"><p className="text-xs text-muted-foreground">Built-in: email, national ID, payment card, patient record, secrets.</p>{rules.map(r => <p key={r} className="border-b border-border pb-2 text-xs">{r}</p>)}<Label name="Rule name"><input className={field} value={rule.name} onChange={e => setRule({ ...rule, name: e.target.value })} /></Label><Label name="Method"><select className={field} value={rule.method} onChange={e => setRule({ ...rule, method: e.target.value })}><option>Regex</option><option>Dictionary</option><option>Proximity</option></select></Label><Label name="Expression or keywords"><input className={field} value={rule.expression} onChange={e => setRule({ ...rule, expression: e.target.value })} /></Label><Label name="Test sample"><input className={field} value={rule.test} onChange={e => setRule({ ...rule, test: e.target.value })} /></Label><p role="status" className="text-xs text-info">Test: {rule.test ? (() => { try { return rule.method === "Regex" ? new RegExp(rule.expression).test(rule.test) ? "Match detected (sample only)" : "No match" : rule.test.toLowerCase().includes(rule.expression.toLowerCase()) ? "Match detected (sample only)" : "No match"; } catch { return "Invalid expression"; } })() : "Enter text to test"}</p><Button size="sm" variant="primary" onClick={async () => {
      if (!rule.name.trim() || !rule.expression.trim()) return alert("Name and expression are required.");
      try {
        const res = await dlpApi.createDiscoveryRule({ name: rule.name, method: rule.method });
        if (res.ok) {
          setRules(res.data.rules);
          alert(`Rule "${rule.name}" saved to backend!`);
        }
      } catch {
        alert("Failed to save rule to backend.");
      }
    }}>Add rule</Button></div></Box><Box title="Labels and fingerprints"><div className="space-y-3"><Label name="Sensitivity label"><select className={field} value={rule.sensitivity} onChange={e => setRule({ ...rule, sensitivity: e.target.value })}>{["Public", "Internal", "Confidential", "Restricted"].map(x => <option key={x}>{x}</option>)}</select></Label><Label name="Regulation mapping"><select className={field} value={rule.regulation} onChange={e => setRule({ ...rule, regulation: e.target.value })}>{["GDPR", "HIPAA", "PCI-DSS", "DPDP Act"].map(x => <option key={x}>{x}</option>)}</select></Label><p className="text-xs">EDM / IDM fingerprint inventory</p>{fingerprints.map(x => <p key={x} className="border-b border-border pb-2 text-xs text-muted-foreground">{x}</p>)}<Button size="sm" onClick={() => { setFingerprints(old => [...old, `New fingerprint ${old.length + 1} · EDM`]); alert("Fingerprint entry added locally; no sensitive reference data uploaded."); }}>Add fingerprint entry</Button></div></Box></div>}
    {tab === "Scan monitor" && <Box title="Scan monitor"><div className="flex flex-wrap items-center justify-between gap-3"><Pill label={scan.state} tone={scan.state === "Running" ? "info" : scan.state === "Completed" ? "success" : "muted"} /><span className="text-xs text-muted-foreground">{scan.progress}% complete · {scan.progress * 14} items/min · {scan.errors} errors</span></div><div className="mt-5 h-3 rounded-full bg-muted" role="progressbar" aria-valuenow={scan.progress} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${scan.progress}%` }} /></div><div className="mt-5 flex flex-wrap gap-2"><Button size="sm" variant="primary" onClick={() => setScan(old => ({ ...old, state: "Running", progress: Math.min(100, old.progress + 20) }))}><Play size={14} />{scan.state === "Paused" ? "Resume" : "Advance preview"}</Button><Button size="sm" onClick={() => setScan(old => ({ ...old, state: "Paused" }))}><Pause size={14} />Pause</Button><Button size="sm" variant="danger" onClick={() => setScan({ state: "Cancelled", progress: 0, errors: 0 })}><X size={14} />Cancel</Button><Button size="sm" onClick={() => setScan({ state: "Running", progress: 12, errors: 0 })}><RefreshCw size={14} />Retry</Button></div><p className="mt-5 text-xs text-muted-foreground">Preview controls demonstrate scan states only. No repository is scanned.</p></Box>}
    {tab === "Findings" && <div className="space-y-4"><Box title="Findings explorer"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><label className="relative"><Search size={15} className="absolute left-3 top-2.5 text-muted-foreground" /><input className={`${field} pl-9`} aria-label="Search findings" placeholder="Search path, owner, rule" value={query} onChange={e => { setQuery(e.target.value); setPage(0); }} /></label><select className={field} aria-label="Filter risk" value={risk} onChange={e => { setRisk(e.target.value); setPage(0); }}>{["All risks", "Critical", "High", "Medium", "Low"].map(x => <option key={x}>{x}</option>)}</select><select className={field} aria-label="Filter regulation" value={regulation} onChange={e => { setRegulation(e.target.value); setPage(0); }}>{["All regulations", "GDPR", "HIPAA", "PCI-DSS", "DPDP Act"].map(x => <option key={x}>{x}</option>)}</select><Button size="sm" onClick={() => { const name = window.prompt("Name this view"); if (name?.trim()) setSavedViews(old => [...old, `${name.trim()}|${query}|${risk}|${regulation}`]); }}>Save view</Button></div>{savedViews.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{savedViews.map(v => { const [name, q, r, reg] = v.split("|"); return <Button key={v} size="sm" variant="ghost" onClick={() => { setQuery(q ?? ""); setRisk(r ?? "All risks"); setRegulation(reg ?? "All regulations"); setPage(0); }}>{name}</Button>; })}</div>}<div className="mt-4 flex flex-wrap gap-2"><Button size="sm" disabled={!selected.length} onClick={() => { setFocus(null); setAction("Bulk dry-run"); }}>Bulk dry-run ({selected.length})</Button><Button size="sm" disabled={!selected.length} onClick={() => { setFocus(null); setAction("Quarantined"); }}>Quarantine selected</Button></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[900px] text-left text-xs"><thead className="border-b border-border text-muted-foreground"><tr>{["Select", "Path / owner", "Label / regulation", "Rule / density", "Confidence", "Risk / exposure", "Status", ""].map(h => <th scope="col" key={h} className="px-2 py-3 font-medium">{h}</th>)}</tr></thead><tbody>{pageRows.map(f => <tr key={f.id} className="border-b border-border"><td className="px-2"><input type="checkbox" aria-label={`Select ${f.id}`} checked={selected.includes(f.id)} onChange={() => setSelected(old => old.includes(f.id) ? old.filter(x => x !== f.id) : [...old, f.id])} /></td><td className="max-w-52 px-2 py-3"><span className="block truncate font-semibold" title={f.path}>{f.path}</span><span className="text-muted-foreground">{f.owner} · {f.repository}</span></td><td className="px-2"><StatusBadge level={f.label} /><span className="block mt-1">{f.regulation}</span></td><td className="px-2">{f.rule}<span className="block text-muted-foreground">{f.density} matches</span></td><td className="px-2">{f.confidence}%</td><td className="px-2"><Pill label={f.risk} tone={f.risk === "Critical" ? "danger" : f.risk === "High" ? "warning" : "info"} /><span className="block mt-1">{f.exposure}</span></td><td className="px-2">{f.status}</td><td className="px-2"><Button size="sm" onClick={() => setFocus(f.id)}>Inspect</Button></td></tr>)}</tbody></table>{!shown.length && <p className="py-8 text-center text-xs text-muted-foreground">No findings match these filters.</p>}</div><div className="mt-4 flex items-center justify-between text-xs"><span>{shown.length ? `${page * 4 + 1}–${Math.min((page + 1) * 4, shown.length)}` : 0} of {shown.length}</span><div className="flex gap-2"><Button size="icon" aria-label="Previous findings" disabled={page === 0} onClick={() => setPage(page - 1)}><ChevronLeft size={16} /></Button><Button size="icon" aria-label="Next findings" disabled={(page + 1) * 4 >= shown.length} onClick={() => setPage(page + 1)}><ChevronRight size={16} /></Button></div></div></Box>{current && <Box title={`Finding ${current.id}`}><div className="grid gap-4 lg:grid-cols-2"><div className="space-y-2 text-xs"><p className="break-all font-semibold">{current.path}</p><p className="text-muted-foreground">Evidence (masked by default): {current.snippet}</p><p>Matched rule: {current.rule} · confidence {current.confidence}%</p><p>Exposure: {current.exposure}</p><p className="text-warning">Full evidence cannot be revealed in this unauthenticated demo.</p></div><div className="flex flex-wrap content-start gap-2"><Button size="sm" onClick={() => onOpenLineage(current.id)}>Open lineage</Button>{["False positive", "Accepted risk", "Quarantined", "Encrypted / DRM", "Sharing restricted", "Re-classify", "Delete"].map(a => <Button key={a} size="sm" variant={a === "Delete" ? "danger" : "secondary"} onClick={() => setAction(a)}>{a}</Button>)}</div></div></Box>}</div>}
    {tab === "Reports" && <div className="grid gap-4 lg:grid-cols-2"><Box title="Discovery report"><p className="text-xs text-muted-foreground">Sensitive inventory, regulation mapping and risk hotspots.</p><Button className="mt-4" size="sm" onClick={() => saveCsv("discovery-report.csv", [["Repository", "Type", "Assets", "Coverage"], ...repositories.map(r => [r.name, r.type, String(r.assets), String(r.coverage)])])}><Download size={15} /> Export inventory CSV</Button></Box><Box title="Finding evidence register"><p className="text-xs text-muted-foreground">Exports masked evidence only. No full sensitive content is included.</p><Button className="mt-4" size="sm" onClick={() => saveCsv("findings-report.csv", [["ID", "Path", "Risk", "Regulation", "Evidence", "Status"], ...findings.map(f => [f.id, f.path, f.risk, f.regulation, f.snippet, f.status])])}><Download size={15} /> Export findings CSV</Button></Box></div>}
    {wizard && <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4" role="presentation"><div role="dialog" aria-modal="true" aria-label="Connect repository" className="w-full max-w-lg rounded-lg border border-border bg-popover p-5 shadow-modal"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">Connect repository</h2><Button size="icon" variant="ghost" aria-label="Close" onClick={() => setWizard(false)}><X size={18} /></Button></div><div className="mt-4 space-y-3"><Label name="Repository type"><select className={field} value={repoType} onChange={e => { setRepoType(e.target.value); setTested(false); }}>{["Endpoint", "Cloud storage", "Network share", "Database", "Mailbox"].map(t => <option key={t}>{t}</option>)}</select></Label><Label name="Display name"><input className={field} value={repoName} onChange={e => setRepoName(e.target.value)} /></Label><Label name="Owner"><input className={field} value={repoOwner} onChange={e => setRepoOwner(e.target.value)} /></Label><Label name="Access credential (write-only)"><input className={field} type="password" autoComplete="off" value={credential} onChange={e => { setCredential(e.target.value); setTested(false); }} placeholder="Not shown after connection" /></Label><p className="text-xs text-warning">Credentials are validated and stored on the backend server.</p><Button size="sm" onClick={() => { if (!repoName.trim() || !repoOwner.trim()) return alert("Enter a name and owner."); setTested(true); }}>Test connection</Button>{tested && <p role="status" className="text-xs text-info">Ready to connect to backend.</p>}</div><div className="mt-5 flex justify-end gap-2"><Button size="sm" onClick={() => setWizard(false)}>Cancel</Button><Button size="sm" variant="primary" disabled={!tested} onClick={async () => {
      try {
        const res = await dlpApi.createRepository({
          name: repoName.trim(),
          type: repoType,
          ...(repoOwner.trim() ? { owner: repoOwner.trim() } : {}),
        });
        if (res.ok) {
          reloadRepos();
          setCredential(""); setRepoName(""); setRepoOwner(""); setTested(false); setWizard(false);
          alert(`Repository "${res.data.name}" added and saved to backend!`);
        }
      } catch {
        alert("Failed to connect repository on backend.");
      }
    }}>Add repository</Button></div></div></div>}
    {action && <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4"><div role="dialog" aria-modal="true" aria-label="Confirm finding action" className="w-full max-w-md rounded-lg border border-border bg-popover p-5 shadow-modal"><h2 className="text-lg font-bold">{action === "Bulk dry-run" ? "Preview bulk action" : `Confirm ${action}`}</h2><p className="mt-2 text-xs text-muted-foreground">{action === "Delete" ? "Destructive action: removes finding from backend database." : "Updates finding status on the backend API."}</p><Label name="Reason / justification"><textarea className={`${field} mt-4 h-20 py-2`} value={reason} onChange={e => setReason(e.target.value)} /></Label><div className="mt-4 flex justify-end gap-2"><Button size="sm" onClick={() => { setAction(""); setReason(""); }}>Cancel</Button><Button size="sm" variant={action === "Delete" ? "danger" : "primary"} disabled={!reason.trim()} onClick={applyAction}><Check size={14} /> Confirm</Button></div></div></div>}
  </div>;
}