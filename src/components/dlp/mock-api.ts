/**
 * DLP API Integration Layer
 *
 * All frontend screens communicate exclusively through `dlpApi.*`.
 * When VITE_API_URL is set (e.g. http://localhost:4000) every call is
 * forwarded to the real Express backend. The backend is located at:
 *
 *   aepttasshield-dlp/aepttasshield-backend/server.js
 */

import type { JourneyEvent } from "./lineage-canvas";

// ── Base URL ─────────────────────────────────────────────────
export const API_BASE_URL = "/api/v1";
const BACKEND_URL: string = import.meta.env["VITE_API_URL"] ?? "http://localhost:4000";

// ── Types ────────────────────────────────────────────────────

export type ApiResponse<T> = {
  ok: boolean;
  status: number;
  endpoint: string;
  latencyMs: number;
  receivedAt: string;
  data: T;
};

export type Sensitivity = "Restricted" | "Confidential" | "Internal" | "Public";

export type Classification = {
  id: number;
  name: string;
  description: string;
  source: string;
  owner: string;
  sensitivity: Sensitivity;
  records: string;
  confidence: number;
  scanned: string;
  active: boolean;
};

export type Repository = {
  id: string;
  name: string;
  type: string;
  owner: string;
  health: "Healthy" | "Attention" | "Testing";
  assets: number;
  coverage: number;
};

export type Finding = {
  id: string;
  path: string;
  owner: string;
  repository: string;
  label: Sensitivity;
  regulation: string;
  rule: string;
  density: number;
  confidence: number;
  risk: string;
  exposure: string;
  snippet: string;
  status: string;
};

export type LineageExample = {
  id: string;
  name: string;
  sensitivity: string;
  owner: string;
  events: JourneyEvent[];
};

export type Incident = {
  id: string;
  title: string;
  policy: string;
  user: string;
  channel: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "Investigating" | "Contained" | "Resolved";
  raised: string;
  assignee: string;
  dataType: string;
};

export type Endpoint = {
  id: string;
  host: string;
  user: string;
  os: string;
  agent: string;
  status: "Protected" | "At risk" | "Offline";
  compliance: number;
  lastSeen: string;
  location: string;
};

export type ComplianceControl = {
  framework: string;
  control: string;
  requirement: string;
  status: "Compliant" | "Partial" | "Gap";
  score: number;
  evidence: string;
  reviewed: string;
};

export type MonitorEvent = {
  id: string;
  time: string;
  actor: string;
  action: string;
  destination: string;
  classification: string;
  verdict: "Blocked" | "Allowed" | "Quarantined" | "Alerted";
  risk: number;
};

export type SessionUser = {
  name: string;
  email: string;
  role: "Security Admin" | "Compliance Officer" | "SOC Analyst";
  initials: string;
  permissions: string[];
};

export const demoCredentials = { email: "admin@aepttas.io", password: "Shield@2026" };

export const monitorFeed: MonitorEvent[] = [
  { id: "EVT-90211", time: "10:42:18", actor: "r.mehta", action: "Upload 12 MB archive", destination: "personal-drive.com", classification: "Payment Card Information", verdict: "Blocked", risk: 94 },
  { id: "EVT-90210", time: "10:41:55", actor: "k.iyer", action: "Git push to remote", destination: "github.com/internal", classification: "Source Code & Secrets", verdict: "Allowed", risk: 22 },
  { id: "EVT-90208", time: "10:41:02", actor: "p.nair", action: "Email with attachment", destination: "partner-hr.example", classification: "Employee Records", verdict: "Quarantined", risk: 71 },
  { id: "EVT-90205", time: "10:40:31", actor: "j.alvarez", action: "Copy to removable media", destination: "USB SanDisk 64GB", classification: "Personal Identifiable Information", verdict: "Blocked", risk: 88 },
  { id: "EVT-90201", time: "10:39:47", actor: "t.wong", action: "Share link created", destination: "SharePoint external", classification: "Internal Communications", verdict: "Alerted", risk: 45 },
];

// ── Core fetch wrapper ───────────────────────────────────────

async function get<T>(path: string): Promise<ApiResponse<T>> {
  const started = performance.now();
  const url = `${BACKEND_URL}${API_BASE_URL}${path}`;
  const response = await fetch(url);
  const envelope = (await response.json()) as { ok: boolean; status: number; receivedAt: string; data: T };
  return {
    ok: response.ok,
    status: response.status,
    endpoint: `${API_BASE_URL}${path}`,
    latencyMs: Math.round(performance.now() - started),
    receivedAt: envelope.receivedAt ?? new Date().toISOString(),
    data: envelope.data,
  };
}

async function post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const started = performance.now();
  const url = `${BACKEND_URL}${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const envelope = (await response.json()) as { ok: boolean; status: number; receivedAt: string; data: T };
  return {
    ok: response.ok,
    status: response.status,
    endpoint: `${API_BASE_URL}${path}`,
    latencyMs: Math.round(performance.now() - started),
    receivedAt: envelope.receivedAt ?? new Date().toISOString(),
    data: envelope.data,
  };
}

async function patch<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
  const started = performance.now();
  const url = `${BACKEND_URL}${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const envelope = (await response.json()) as { ok: boolean; status: number; receivedAt: string; data: T };
  return {
    ok: response.ok,
    status: response.status,
    endpoint: `${API_BASE_URL}${path}`,
    latencyMs: Math.round(performance.now() - started),
    receivedAt: envelope.receivedAt ?? new Date().toISOString(),
    data: envelope.data,
  };
}

async function del<T>(path: string): Promise<ApiResponse<T>> {
  const started = performance.now();
  const url = `${BACKEND_URL}${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
  const envelope = (await response.json()) as { ok: boolean; status: number; receivedAt: string; data: T };
  return {
    ok: response.ok,
    status: response.status,
    endpoint: `${API_BASE_URL}${path}`,
    latencyMs: Math.round(performance.now() - started),
    receivedAt: envelope.receivedAt ?? new Date().toISOString(),
    data: envelope.data,
  };
}

// ── Public API client ────────────────────────────────────────

export const dlpApi = {
  // Auth
  login: (email: string, password: string) =>
    post<{ token: string; user: SessionUser } | null>("/auth/login", { email, password }),

  logout: () => post<{ revoked: boolean }>("/auth/logout", {}),

  // Data Classification
  getClassifications: () => get<Classification[]>("/classifications"),
  createClassification: (item: {
    name: string;
    description?: string;
    source?: string;
    owner?: string;
    sensitivity?: Sensitivity;
    records?: string;
    confidence?: number;
  }) => post<Classification>("/classifications", item),
  updateClassification: (id: number, patchData: Partial<Classification>) =>
    patch<Classification>(`/classifications/${id}`, patchData),
  deleteClassification: (id: number) => del<Classification>(`/classifications/${id}`),

  // Data Discovery
  getDiscoveryRepositories: () => get<Repository[]>("/discovery/repositories"),
  createRepository: (item: { name: string; type: string; owner?: string }) =>
    post<Repository>("/discovery/repositories", item),
  testRepository: (id: string) =>
    post<{ success: boolean; message: string; repository: Repository }>(`/discovery/repositories/${id}/test`, {}),
  getDiscoveryFindings: () => get<Finding[]>("/discovery/findings"),
  updateFinding: (id: string, patchData: Partial<Finding>) =>
    patch<Finding>(`/discovery/findings/${id}`, patchData),
  deleteFinding: (id: string) => del<Finding>(`/discovery/findings/${id}`),
  getDiscoveryRules: () => get<string[]>("/discovery/rules"),
  createDiscoveryRule: (rule: { name: string; method?: string }) =>
    post<{ success: boolean; rule: string; rules: string[] }>("/discovery/rules", rule),

  // Data Lineage
  getLineageExamples: () => get<LineageExample[]>("/lineage/examples"),
  recordLineageAction: (item: { action: string; eventId?: string; flowId?: string; reason?: string }) =>
    post<{ success: boolean; action: string; timestamp: string }>("/lineage/actions", item),

  // Incidents
  getIncidents: () => get<Incident[]>("/incidents"),
  updateIncident: (id: string, patchData: Partial<Incident>) =>
    patch<Incident>(`/incidents/${id}`, patchData),

  // Endpoints
  getEndpoints: () => get<Endpoint[]>("/endpoints"),
  triggerEndpointAction: (id: string, action: string) =>
    post<{ success: boolean; action: string; endpoint: Endpoint; timestamp: string }>(
      `/endpoints/${id}/actions`,
      { action }
    ),

  // Compliance
  getCompliance: () => get<ComplianceControl[]>("/compliance/controls"),

  // Monitoring
  getMonitorFeed: () => get<MonitorEvent[]>("/monitoring/events"),

  // Analytics
  getReports: () =>
    get<{
      trend: number[];
      channels: [string, number][];
      departments: [string, number][];
    }>("/analytics/reports"),
};
