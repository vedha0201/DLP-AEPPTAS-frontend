import { useMemo, useState } from "react";
import { Download, Plus, SlidersHorizontal } from "lucide-react";
import { Button, Pill } from "./shared";

type Confidence = "High" | "Medium" | "Low";
type Row = { id: string; asset: string; path: string; pattern: string; confidence: Confidence; score: number; sample: string; fp: boolean; review: boolean };

const sampleRows: Row[] = [
  { id: "DF-01", asset: "Finance Share", path: "/finance/settlements/q3.xlsx", pattern: "Financial · Card", confidence: "High", score: 97, sample: "4111 •••• •••• 1111", fp: false, review: false },
  { id: "DF-02", asset: "HR Workspace", path: "/people/payroll/2026-09.csv", pattern: "PII · National ID", confidence: "High", score: 92, sample: "•••-••-6789", fp: false, review: false },
  { id: "DF-03", asset: "QA Staging DB", path: "staging.customers_mock", pattern: "PII · Email", confidence: "Low", score: 41, sample: "t••t@example.com", fp: true, review: false },
  { id: "DF-04", asset: "Support Mailbox", path: "/inbox/ticket-8812.eml", pattern: "PII · Phone", confidence: "Medium", score: 68, sample: "+91 ••••• ••210", fp: false, review: true },
  { id: "DF-05", asset: "Analytics Lake", path: "s3://lake/orders/part-0007", pattern: "Financial · IBAN", confidence: "Medium", score: 74, sample: "DE89 •••• •••• 3000", fp: false, review: true },
  { id: "DF-06", asset: "Dev Sandbox", path: "/samples/fake_cards.json", pattern: "Financial · Card", confidence: "Low", score: 33, sample: "4242 •••• •••• 4242", fp: true, review: false },
];
const tone = { High: "success", Medium: "warning", Low: "muted" } as const;

function Toggle({ label, hint, on, onChange }: { label: string; hint?: string; on: boolean; onChange: (v: boolean) => void }) {
  return <label className="flex cursor-pointer items-start justify-between gap-3 border-b border-border py-2 text-xs">
    <span className="min-w-0"><span className="font-semibold">{label}</span>{hint && <span className="block text-muted-foreground">{hint}</span>}</span>
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}><span className={`absolute top-0.5 size-4 rounded-full bg-foreground transition-all ${on ? "left-4" : "left-0.5"}`} /></button>
  </label>;
}

export function DiscoveryPrecision({ onNotify, onCreateScan }: { onNotify: (t: string) => void; onCreateScan: () => void }) {
  const [rows, setRows] = useState(sampleRows);
  const [threshold, setThreshold] = useState(85);
  const [engine, setEngine] = useState("Strict Regex + Context ML Engine");
  const [ex, setEx] = useState({ test: true, mock: true, samples: true, staging: false });
  const [val, setVal] = useState({ proximity: true, luhn: true });
  const [quick, setQuick] = useState<"All" | "High" | "Review" | "Flagged">("All");

  const visible = useMemo(() => rows.filter(r => quick === "High" ? r.confidence === "High" : quick === "Review" ? r.review : quick === "Flagged" ? r.fp : true), [rows, quick]);
  const flagged = rows.filter(r => r.fp).length;
  const high = rows.filter(r => r.score >= threshold && !r.fp).length;
  const fpr = ((flagged / rows.length) * 2.4).toFixed(1);

  function exportCsv() {
    const csv = ["Asset,Path,Pattern,Confidence,Score,Sample,FalsePositive", ...rows.map(r => [r.asset, r.path, r.pattern, r.confidence, r.score, r.sample, r.fp].map(x => `"${String(x).replaceAll('"', '""')}"`).join(","))].join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); a.download = "discovery-precision-report.csv"; a.click(); URL.revokeObjectURL(a.href);
  }

  return <div className="space-y-4">
    <div className="flex flex-wrap justify-end gap-2">
      <Button variant="primary" size="sm" onClick={onCreateScan}><Plus size={15} /> Create Discovery Scan</Button>
      <Button size="sm" onClick={() => onNotify("Exclusions tuned in bulk for this preview only.")}><SlidersHorizontal size={14} /> Bulk Tune Exclusions</Button>
      <Button size="sm" onClick={exportCsv}><Download size={14} /> Export Report</Button>
    </div>

    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {[["Active scans", "3", "2 full · 1 incremental", ""], ["High-confidence sensitive assets", String(high), `≥ ${threshold}% confidence`, ""], ["False positive rate", `${fpr}% FPR`, "-0.4% this week", "text-success"], ["High-confidence vs unconfirmed", `${high} / ${rows.length - high}`, "Confirmed / needs review", ""]].map(([k, v, d, c]) =>
        <div key={k} className="rounded-lg border border-border bg-card p-4 shadow-panel"><p className="text-xs text-muted-foreground">{k}</p><p className="mt-2 text-2xl font-bold">{v}</p><p className={`mt-1 text-[11px] ${c || "text-muted-foreground"}`}>{d}</p></div>)}
    </div>

    <div className="grid gap-4 lg:grid-cols-3">
      <section className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-bold">Detection precision</h2>
        <label className="mt-3 block text-xs text-muted-foreground">Engine
          <select className="mt-1 h-9 w-full rounded-md border border-input bg-field px-3 text-xs text-foreground" value={engine} onChange={e => setEngine(e.target.value)}>
            <option>Strict Regex + Context ML Engine</option><option>Regex only</option><option>ML classifier only</option>
          </select>
        </label>
        <div className="mt-4 flex justify-between text-xs"><span>Confidence threshold</span><strong className="text-primary">{threshold}%+</strong></div>
        <input type="range" min={50} max={99} value={threshold} onChange={e => setThreshold(Number(e.target.value))} aria-label="Confidence threshold" className="mt-2 w-full accent-primary" />
        <div className="mt-2 h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${threshold}%` }} /></div>
        <p className="mt-2 text-[11px] text-muted-foreground">Matches below this score are held as low-grade noise instead of alerting.</p>
      </section>
      <section className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-bold">Exclusions & whitelisting</h2>
        <div className="mt-2">
          <Toggle label="Exclude test databases" on={ex.test} onChange={v => setEx({ ...ex, test: v })} />
          <Toggle label="Exclude mock data" on={ex.mock} onChange={v => setEx({ ...ex, mock: v })} />
          <Toggle label="Exclude sample files" on={ex.samples} onChange={v => setEx({ ...ex, samples: v })} />
          <Toggle label="Exclude internal staging" on={ex.staging} onChange={v => setEx({ ...ex, staging: v })} />
        </div>
      </section>
      <section className="rounded-lg border border-border bg-card p-4">
        <h2 className="text-sm font-bold">Contextual validation</h2>
        <div className="mt-2">
          <Toggle label="Require proximity terms" hint="‘SSN’ or ‘CVV’ must appear near 9–16 digit numbers" on={val.proximity} onChange={v => setVal({ ...val, proximity: v })} />
          <Toggle label="Check verification algorithms" hint="Luhn check for cards, IBAN checksum" on={val.luhn} onChange={v => setVal({ ...val, luhn: v })} />
        </div>
      </section>
    </div>

    <section className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold">Discovered sensitive data findings</h2>
        <div className="flex flex-wrap gap-2">{([["All", "All"], ["High", "High Confidence Only"], ["Review", "Needs Context Review"], ["Flagged", "Flagged False Positives"]] as const).map(([k, l]) => <Button key={k} size="sm" variant={quick === k ? "primary" : "secondary"} onClick={() => setQuick(k)}>{l}</Button>)}</div>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-xs">
          <thead className="text-muted-foreground"><tr>{["Asset / Source", "Location / Path", "Detected pattern", "Confidence", "Match sample", "False positive", "Action"].map(h => <th key={h} className="border-b border-border p-2 font-semibold">{h}</th>)}</tr></thead>
          <tbody>{visible.map(r => <tr key={r.id} className={`border-b border-border ${r.fp ? "opacity-60" : ""}`}>
            <td className="p-2 font-semibold">{r.asset}</td>
            <td className="max-w-[200px] truncate p-2 font-mono text-[11px] text-muted-foreground">{r.path}</td>
            <td className="p-2">{r.pattern}</td>
            <td className="p-2"><Pill label={`${r.confidence} · ${r.score}%`} tone={tone[r.confidence]} /></td>
            <td className="p-2 font-mono">{r.sample}</td>
            <td className="p-2"><div className="flex gap-1">
              <Button size="sm" variant={r.fp ? "secondary" : "danger"} onClick={() => { setRows(o => o.map(x => x.id === r.id ? { ...x, fp: !x.fp, review: false } : x)); onNotify(r.fp ? "Flag removed (local)." : "Marked as false positive (local)."); }}>{r.fp ? "Unflag" : "Mark as False Positive"}</Button>
              <Button size="sm" variant="ghost" onClick={() => onNotify(`Tune logic for ${r.pattern} opened — preview only.`)}>Tune Logic</Button>
            </div></td>
            <td className="p-2"><select aria-label={`Action for ${r.asset}`} defaultValue="" className="h-8 rounded-md border border-input bg-field px-2 text-xs" onChange={e => { if (e.target.value) onNotify(`${e.target.value} recorded locally for ${r.asset}.`); e.target.value = ""; }}>
              <option value="" disabled>Actions</option><option>Confirm sensitive</option><option>Quarantine</option><option>Add path to exclusions</option><option>Re-scan</option>
            </select></td>
          </tr>)}</tbody>
        </table>
        {!visible.length && <p className="py-6 text-center text-xs text-muted-foreground">No findings for this filter.</p>}
      </div>
    </section>
  </div>;
}
