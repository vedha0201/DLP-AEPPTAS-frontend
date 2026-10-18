import { useState } from "react";
import { Bell, Check, CircleHelp, LogOut, Menu, Network, Search, Settings, ShieldCheck, Users, X } from "lucide-react";

import { ClassificationModule, navGroups } from "../data-classification-app";
import { dlpApi, type SessionUser } from "./mock-api";

const defaultUser: SessionUser = { name: "S. Dutta", email: "admin@aepttas.io", role: "Security Admin", initials: "SD", permissions: [] };
import {
  ComplianceModule,
  EndpointsModule,
  IncidentsModule,
  MonitoringModule,
  ModulePlaceholder,
  OverviewModule,
  ReportingModule,
} from "./modules";
import { Button } from "./shared";
import { DiscoveryWorkspace } from "./discovery-workspace";
import { LineageWorkspace } from "./lineage-workspace";

export function DlpApp() {
  const [session] = useState<SessionUser>(defaultUser);
  const [view, setView] = useState("Data Classification");
  const [lineageFinding, setLineageFinding] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");

  function notify(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }

  function go(next: string) {
    setView(next);
    setSidebarOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  async function signOut() {
    await dlpApi.logout();
    notify("Signed out (demo mode — reload to sign back in)");
    setView("Data Classification");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {notice && (
        <div className="fixed right-4 top-4 z-[70] flex items-center gap-2 rounded-md border border-success/30 bg-popover px-4 py-3 text-sm font-semibold shadow-modal" role="status">
          <Check size={16} className="text-success" />
          {notice}
        </div>
      )}
      {sidebarOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-overlay lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-border bg-sidebar transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[72px] items-center gap-3 border-b border-border px-5">
          <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"><ShieldCheck size={20} /></div>
          <div>
            <p className="text-sm font-black tracking-wide">AEPTTAS<span className="text-primary">SHIELD</span></p>
            <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Enterprise DLP</p>
          </div>
          <Button size="icon" variant="ghost" className="ml-auto lg:hidden" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}><X size={18} /></Button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="mb-1.5 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-nav-label">{group.label}</p>
              {group.items.map((item) => {
                const active = view === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => go(item.name)}
                    aria-current={active ? "page" : undefined}
                    className={`mb-1 flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "bg-primary/20 text-foreground ring-1 ring-inset ring-primary/35" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                  >
                    <item.icon size={18} className={active ? "text-primary" : ""} />
                    {item.name}
                    {active && <span className="ml-auto size-1.5 rounded-full bg-primary" />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="m-3 rounded-lg border border-border bg-secondary/60 p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-success" /></span>
            <p className="text-xs font-bold">Agent Network</p>
          </div>
          <p className="mt-1 pl-4 text-[9px] text-muted-foreground">1,248 endpoints operational</p>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center gap-3 border-b border-border bg-header/95 px-4 backdrop-blur sm:px-6">
          <Button size="icon" variant="ghost" className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20} /></Button>
          <div className="relative max-w-md flex-1">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className="h-10 w-full rounded-md border border-input bg-field pl-10 pr-3 text-xs outline-none placeholder:text-muted-foreground focus:border-primary" placeholder="Search data, incidents, endpoints..." aria-label="Global search" />
          </div>
          <Button size="icon" variant="secondary" aria-label="Help"><CircleHelp size={18} /></Button>
          <Button size="icon" variant="secondary" aria-label="Notifications" className="relative" onClick={() => notify("3 unread security notifications")}>
            <Bell size={18} />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-danger" />
          </Button>
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{session.initials}</div>
            <div className="hidden xl:block">
              <p className="text-xs font-bold">{session.name}</p>
              <p className="text-[9px] text-muted-foreground">{session.role}</p>
            </div>
          </div>
          <Button size="icon" variant="secondary" aria-label="Sign out" onClick={signOut}><LogOut size={17} /></Button>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 sm:py-7">
          {view === "Security Overview" && <OverviewModule onNavigate={go} />}
          {view === "Data Classification" && <ClassificationModule notify={notify} />}
          {view === "Incidents" && <IncidentsModule notify={notify} />}
          {view === "Endpoints" && <EndpointsModule notify={notify} />}
          {view === "Reporting & Analytics" && <ReportingModule notify={notify} />}
          {view === "Compliance" && <ComplianceModule notify={notify} />}
          {view === "Real-Time Monitoring" && <MonitoringModule />}
          {view === "Data Discovery" && <DiscoveryWorkspace onOpenLineage={(id) => { setLineageFinding(id); go("Data Lineage"); }} />}
          {view === "Data Lineage" && <LineageWorkspace findingId={lineageFinding} onOpenDiscovery={() => go("Data Discovery")} />}
          {view === "Policies" && <ModulePlaceholder name="Policies" icon={ShieldCheck} description="Author and publish DLP enforcement policies across channels." capabilities={["Policy builder", "Channel enforcement rules", "Exception approvals", "Version history"]} />}
          {view === "UEBA" && <ModulePlaceholder name="UEBA" icon={Users} description="Behavioural analytics for insider risk and anomalous data access." capabilities={["User risk scoring", "Peer group baselines", "Anomaly timeline", "Watchlists"]} />}
          {view === "Risk Analytics" && <ModulePlaceholder name="Risk Analytics" icon={Users} description="Quantify data risk exposure across business units." capabilities={["Risk heatmaps", "Exposure forecasting", "Control effectiveness", "Board-level summaries"]} />}
          {view === "Integrations" && <ModulePlaceholder name="Integrations" icon={Network} description="Connect cloud platforms, SIEM, identity and collaboration tools." capabilities={["Connector catalogue", "API credentials", "Sync health", "Webhook events"]} />}
          {view === "Settings" && <ModulePlaceholder name="Settings" icon={Settings} description="Manage tenant configuration, roles and administrator preferences." capabilities={["Role based access", "Notification rules", "Retention settings", "Audit log"]} />}
        </main>
      </div>
    </div>
  );
}
