import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { AlertTriangle, ChevronLeft, ChevronRight, Download, ExternalLink, Filter, GitBranch, RefreshCw, Search, X } from "lucide-react";
import { ApiBadge, Button, PageHeader, Pill } from "./shared";
import { LineageProvenance } from "./lineage-provenance";
import type { JourneyEvent } from "./lineage-canvas";
import { dlpApi, type LineageExample } from "./mock-api";
import { useApi } from "./use-api";

const Canvas = lazy(() => import("./lineage-canvas").then(m => ({ default: m.LineageCanvas })));

const defaultFlow: LineageExample = {
  id: "",
  name: "Loading...",
  sensitivity: "Internal",
  owner: "",
  events: [],
};
const EMPTY_EXAMPLES: LineageExample[] = [];

const channels = ["Endpoint", "Network/Web", "Cloud", "Email", "Mobile", "USB", "AI/LLM"];
const input = "h-9 w-full rounded-md border border-input bg-field px-3 text-xs outline-none focus:border-primary";
function download(name: string, content: string, mime: string) { const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([content], { type: mime })); link.download = name; link.click(); URL.revokeObjectURL(link.href); }

export function LineageWorkspace({ findingId, onOpenDiscovery }: { findingId: string | null; onOpenDiscovery: () => void }) {
  const { data: apiExamples, loading, latency, error, reload } = useApi(dlpApi.getLineageExamples);
  const activeExamples = (apiExamples && apiExamples.length > 0)
    ? apiExamples
    : EMPTY_EXAMPLES;

  const [flowId, setFlowId] = useState("");
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState("All channels");
  const [risk, setRisk] = useState("All risks");
  const [eventType, setEventType] = useState("All actions");
  const [step, setStep] = useState(0);
  const [depth, setDepth] = useState(7);
  const [view, setView] = useState<"Graph" | "Table">("Graph");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (activeExamples.length > 0 && !flowId && activeExamples[0]) {
      setFlowId(activeExamples[0].id);
    }
  }, [activeExamples, flowId]);
  useEffect(() => { if (findingId && activeExamples.some(x => x.id === findingId)) { setFlowId(findingId); setStep(0); } }, [findingId, activeExamples]);
  const flow: LineageExample = activeExamples.find(x => x.id === flowId) ?? activeExamples[0] ?? defaultFlow;
  const filteredFlows = activeExamples.filter(x => `${x.name} ${x.id} ${x.owner} ${x.sensitivity} ${x.events.map(e => `${e.actor} ${e.device} ${e.destination} ${e.policy}`).join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  const events = useMemo(() => flow.events.filter(e => (channel === "All channels" || e.channel === channel) && (risk === "All risks" || e.risk === risk) && (eventType === "All actions" || e.action === eventType)).slice(0, depth), [flow, channel, risk, eventType, depth]);
  const active = events[Math.min(step, events.length - 1)];
  const selected = flow.events.find(e => e.id === selectedId);
  function notify(text: string) { setNotice(text); window.setTimeout(() => setNotice(""), 4000); }
  function setFilter(key: string, value: string) { const params = new URLSearchParams(window.location.search); value ? params.set(key, value) : params.delete(key); history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`); }
  async function confirmAction(action: string) {
    const reason = window.prompt(`Reason for ${action}?`);
    if (reason?.trim()) {
      try {
        const evId = selectedId || active?.id;
        await dlpApi.recordLineageAction({
          action,
          flowId: flow.id,
          ...(evId ? { eventId: evId } : {}),
          reason: reason.trim(),
        });
        notify(`${action} persisted to backend API. Reason: ${reason.trim()}`);
      } catch {
        notify(`${action} recording failed on backend.`);
      }
    }
  }
  return <div className="min-w-0 space-y-5">
    <PageHeader
      eyebrow="Data security / in motion"
      title="Data Lineage"
      description="Trace sensitive data, investigate violations and follow egress paths."
      actions={
        <div className="flex items-center gap-2">
          <ApiBadge endpoint="/api/v1/lineage/examples" latency={latency} />
          <Button variant="secondary" size="sm" onClick={() => { reload(); notify("Lineage refreshed from backend"); }}>
            <RefreshCw size={14} /> Refresh
          </Button>
        </div>
      }
    />
    {error && (
      <div className="flex items-center justify-between rounded-lg border border-danger/40 bg-danger-soft p-4 text-xs text-danger">
        <div>
          <p className="font-bold">Backend connection failed ({error})</p>
          <p className="mt-1 text-muted-foreground">Make sure the backend is running: <code className="rounded bg-field px-1 font-mono">npm run backend</code></p>
        </div>
        <Button size="sm" variant="secondary" onClick={reload}><RefreshCw size={14} /> Retry</Button>
      </div>
    )}
    {notice && <div role="status" className="rounded-md border border-info bg-info-soft p-3 text-xs">{notice}</div>}
    <LineageProvenance onNotify={notify} />
    <section className="rounded-lg border border-border bg-card p-4"><div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"><label className="relative"><Search size={15} className="absolute left-3 top-2.5 text-muted-foreground" /><input aria-label="Search lineage" className={`${input} pl-9`} value={query} onChange={e => { setQuery(e.target.value); setFilter("search", e.target.value); }} placeholder="File, hash, user, device, destination, incident..." /></label><select aria-label="Filter channel" className={input} value={channel} onChange={e => { setChannel(e.target.value); setStep(0); setFilter("channel", e.target.value === "All channels" ? "" : e.target.value); }}><option>All channels</option>{channels.map(x => <option key={x}>{x}</option>)}</select><select aria-label="Filter risk" className={input} value={risk} onChange={e => { setRisk(e.target.value); setStep(0); setFilter("risk", e.target.value === "All risks" ? "" : e.target.value); }}>{["All risks", "Critical", "High", "Medium", "Low"].map(x => <option key={x}>{x}</option>)}</select><select aria-label="Filter action" className={input} value={eventType} onChange={e => { setEventType(e.target.value); setStep(0); setFilter("action", e.target.value === "All actions" ? "" : e.target.value); }}>{["All actions", "Allowed", "Warned", "Blocked"].map(x => <option key={x}>{x}</option>)}</select></div><div className="mt-3 flex flex-wrap gap-2">{filteredFlows.map(x => <Button size="sm" key={x.id} variant={x.id === flowId ? "primary" : "secondary"} onClick={() => { setFlowId(x.id); setStep(0); setSelectedId(null); setFilter("flow", x.id); }}>{x.id} · {x.name}</Button>)}{!filteredFlows.length && <p className="text-xs text-muted-foreground">No matching flows.</p>}</div><div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><Filter size={14} /> Time: last 24 hours · Sensitivity: {flow.sensitivity} · Policy: all · <span>URL filters update as you explore</span></div></section>
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[["Tracked events", flow.events.length], ["Channels", new Set(flow.events.map(e => e.channel)).size], ["Violations", flow.events.filter(e => e.action === "Blocked").length], ["Risk", flow.events.some(e => e.risk === "Critical") ? "Critical" : "High"]].map(([k,v]) => <div key={k} className="rounded-lg border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{k}</p><p className="mt-2 text-xl font-bold">{v}</p></div>)}</div>
    <section className="min-w-0 rounded-lg border border-border bg-card p-4"><div className="mb-4 flex flex-wrap items-center justify-between gap-2"><div><h2 className="text-sm font-bold">Lineage canvas</h2><p className="text-xs text-muted-foreground">{flow.name} · {flow.owner} · {flow.sensitivity}</p></div><div className="flex gap-2"><Button size="sm" variant={view === "Graph" ? "primary" : "secondary"} onClick={() => setView("Graph")}>Graph</Button><Button size="sm" variant={view === "Table" ? "primary" : "secondary"} onClick={() => setView("Table")}>Table</Button><select aria-label="Graph depth" value={depth} onChange={e => setDepth(Number(e.target.value))} className={`${input} w-auto`}><option value={3}>Depth 3</option><option value={5}>Depth 5</option><option value={7}>All nodes</option></select></div></div>{view === "Graph" ? <Suspense fallback={<div className="h-[360px] animate-pulse bg-muted" />}><Canvas events={events} activeId={active?.id ?? ""} onSelect={id => setSelectedId(id)} /></Suspense> : <div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-xs"><thead><tr>{["Time", "Channel", "Node", "Actor", "Destination", "Action"].map(x => <th key={x} className="border-b border-border p-2">{x}</th>)}</tr></thead><tbody>{events.map(e => <tr key={e.id} className="border-b border-border"><td className="p-2">{e.time}</td><td className="p-2">{e.channel}</td><td className="p-2"><Button size="sm" variant="ghost" onClick={() => setSelectedId(e.id)}>{e.name}</Button></td><td className="p-2">{e.actor}</td><td className="p-2">{e.destination}</td><td className="p-2">{e.action}</td></tr>)}</tbody></table></div>}{!events.length && <p className="py-6 text-center text-xs">No events match the filters.</p>}<p className="mt-3 text-xs text-muted-foreground">Legend: purple = selected · red = policy violation · blue arrows = data transfer. Drag to pan; use zoom controls and minimap.</p></section>
    <section className="rounded-lg border border-border bg-card p-4"><h2 className="text-sm font-bold">Channel flow tracks</h2><div className="mt-3 space-y-2">{channels.map(c => <div key={c} className="grid grid-cols-[100px_1fr] items-center gap-2 border-b border-border py-2 text-xs"><span className="text-muted-foreground">{c}</span><div className="flex flex-wrap gap-2">{flow.events.filter(e => e.channel === c).map(e => <Button key={e.id} size="sm" variant={e.action === "Blocked" ? "danger" : "secondary"} onClick={() => setSelectedId(e.id)}>{e.time} · {e.name}</Button>)}{!flow.events.some(e => e.channel === c) && <span className="text-muted-foreground">—</span>}</div></div>)}</div></section>
    <section className="rounded-lg border border-border bg-card p-4"><div className="flex justify-between gap-2"><h2 className="text-sm font-bold">Timeline playback</h2><Button size="sm" variant="danger" onClick={() => { const index = events.findIndex(e => e.action === "Blocked"); if (index >= 0) { setStep(index); setSelectedId(events[index]?.id ?? null); } }}><AlertTriangle size={14} /> First violation</Button></div><div className="mt-4 flex gap-1">{events.map((e,i) => <Button key={e.id} size="sm" variant={i === step ? "primary" : e.action === "Blocked" ? "danger" : "secondary"} className="min-w-0 flex-1 overflow-hidden px-1" title={`${e.time} ${e.name}`} onClick={() => { setStep(i); setSelectedId(e.id); }}>{e.time}</Button>)}</div><input className="mt-4 w-full accent-primary" type="range" aria-label="Scrub timeline" min={0} max={Math.max(0, events.length-1)} value={Math.min(step, Math.max(0, events.length-1))} onChange={e => setStep(Number(e.target.value))} /><div className="mt-3 flex items-center justify-between"><Button size="icon" aria-label="Previous event" disabled={step === 0} onClick={() => setStep(step-1)}><ChevronLeft size={16} /></Button><p className="px-2 text-center text-xs">{active ? `${active.time} · ${active.name} · ${active.action}` : "No event"}</p><Button size="icon" aria-label="Next event" disabled={step >= events.length - 1} onClick={() => setStep(step+1)}><ChevronRight size={16} /></Button></div></section>
    <div className="grid gap-4 lg:grid-cols-2"><section className="rounded-lg border border-border bg-card p-4"><h2 className="text-sm font-bold">Flow analytics</h2><p className="mt-1 text-xs text-muted-foreground">Source → destination · top egress paths</p>{flow.events.map(e => <div key={e.id} className="mt-3 flex items-center gap-2 border-b border-border pb-2 text-xs"><span className="min-w-0 flex-1 truncate">{e.name} → {e.destination}</span><Pill label={e.risk} tone={e.risk === "Critical" || e.risk === "High" ? "danger" : "info"} /></div>)}<p className="mt-4 text-xs text-warning">Anomaly: external egress attempts are highlighted where a policy blocked transfer.</p></section><section className="rounded-lg border border-border bg-card p-4"><h2 className="text-sm font-bold">Actions and evidence</h2><p className="mt-1 text-xs text-muted-foreground">Persisted policy and evidence controls.</p><div className="mt-4 flex flex-wrap gap-2">{["Open incident", "Block destination", "Quarantine copy", "Trigger re-scan", "Send to SIEM/SOAR"].map(a => <Button key={a} size="sm" onClick={() => confirmAction(a)}>{a}</Button>)}<Button size="sm" onClick={onOpenDiscovery}><ExternalLink size={14} /> Open Discovery finding</Button><Button size="sm" onClick={() => download(`lineage-${flow.id}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="80"><rect width="600" height="80" fill="#182038"/><text x="15" y="40" fill="white">${flow.name.replaceAll("&", "&amp;")} - ${flow.events.length} events</text></svg>`, "image/svg+xml")}><Download size={14} /> SVG summary</Button><Button size="sm" onClick={() => download(`lineage-${flow.id}-evidence.csv`, [["Time", "Node", "Channel", "Actor", "Destination", "Action", "Policy"].join(","), ...flow.events.map(e => [e.time, e.name, e.channel, e.actor, e.destination, e.action, e.policy].map(x => `"${x.replaceAll('"','""')}"`).join(","))].join("\n"), "text/csv")}><Download size={14} /> Evidence CSV</Button></div></section></div>
    {selected && <div className="fixed inset-0 z-50 flex justify-end bg-overlay" onClick={() => setSelectedId(null)}><aside role="dialog" aria-modal="true" aria-label="Event context" className="h-full w-full max-w-md overflow-y-auto border-l border-border bg-popover p-5 shadow-modal" onClick={e => e.stopPropagation()}><div className="flex justify-between"><h2 className="text-lg font-bold">Event context</h2><Button size="icon" variant="ghost" aria-label="Close context" onClick={() => setSelectedId(null)}><X size={18} /></Button></div><p className="mt-2 text-xs text-muted-foreground">{selected.time} · {selected.channel}</p><h3 className="mt-5 font-bold">{selected.name}</h3><div className="mt-4 space-y-3 text-xs">{[["Actor", selected.actor], ["User risk score", selected.risk === "Critical" ? "92 / 100" : "36 / 100"], ["Device", selected.device], ["Device health", "Protected (sample)"], ["IP / location", "Masked · internal network"], ["Destination", selected.destination], ["Policy", selected.policy], ["Action", selected.action], ["Process tree", "agent → browser → transfer"], ["Event metadata", selected.note]].map(([k,v]) => <div key={k} className="flex justify-between gap-3 border-b border-border pb-2"><span className="text-muted-foreground">{k}</span><strong className="max-w-[60%] text-right">{v}</strong></div>)}</div><p className="mt-5 text-xs text-warning">Sensitive details remain masked; no role-based reveal is available in this demo.</p></aside></div>}
  </div>;
}