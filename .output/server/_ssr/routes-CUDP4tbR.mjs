import { n as __toESM } from "../_runtime.mjs";
import { o as performance_default } from "../_libs/@xyflow/react+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { A as GitBranch, B as Cloud, C as Menu, D as LayoutDashboard, E as LockKeyhole, F as FileCheckCorner, G as Check, H as CircleCheck, I as ExternalLink, J as Bell, K as ChartColumn, L as Download, M as FingerprintPattern, N as FileSearch, O as Laptop, P as FileKey, R as Database, S as Network, T as Lock, U as ChevronRight, V as CircleQuestionMark, W as ChevronLeft, X as Activity, Y as ArrowRight, _ as RefreshCw, a as Users, b as Play, c as Trash2, d as Siren, f as ShieldCheck, g as ScanSearch, h as Search, i as Wifi, j as Funnel, k as HardDrive, l as Sparkles, m as Settings, n as X, o as TriangleAlert, p as ShieldAlert, q as Bot, r as Workflow, s as TrendingUp, t as Zap, u as SlidersHorizontal, v as Radio, w as LogOut, x as Pause, y as Plus, z as Cpu } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CUDP4tbR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_BASE_URL = "/api/v1";
var BACKEND_URL = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_API_URL": "http://localhost:4000",
	"VITE_USE_MOCK": "false"
}["VITE_API_URL"] ?? "http://localhost:4000";
var monitorFeed = [
	{
		id: "EVT-90211",
		time: "10:42:18",
		actor: "r.mehta",
		action: "Upload 12 MB archive",
		destination: "personal-drive.com",
		classification: "Payment Card Information",
		verdict: "Blocked",
		risk: 94
	},
	{
		id: "EVT-90210",
		time: "10:41:55",
		actor: "k.iyer",
		action: "Git push to remote",
		destination: "github.com/internal",
		classification: "Source Code & Secrets",
		verdict: "Allowed",
		risk: 22
	},
	{
		id: "EVT-90208",
		time: "10:41:02",
		actor: "p.nair",
		action: "Email with attachment",
		destination: "partner-hr.example",
		classification: "Employee Records",
		verdict: "Quarantined",
		risk: 71
	},
	{
		id: "EVT-90205",
		time: "10:40:31",
		actor: "j.alvarez",
		action: "Copy to removable media",
		destination: "USB SanDisk 64GB",
		classification: "Personal Identifiable Information",
		verdict: "Blocked",
		risk: 88
	},
	{
		id: "EVT-90201",
		time: "10:39:47",
		actor: "t.wong",
		action: "Share link created",
		destination: "SharePoint external",
		classification: "Internal Communications",
		verdict: "Alerted",
		risk: 45
	}
];
async function get(path) {
	const started = performance_default.now();
	const url = `${BACKEND_URL}${API_BASE_URL}${path}`;
	const response = await fetch(url);
	const envelope = await response.json();
	return {
		ok: response.ok,
		status: response.status,
		endpoint: `${API_BASE_URL}${path}`,
		latencyMs: Math.round(performance_default.now() - started),
		receivedAt: envelope.receivedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
		data: envelope.data
	};
}
async function post(path, body) {
	const started = performance_default.now();
	const url = `${BACKEND_URL}${API_BASE_URL}${path}`;
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	});
	const envelope = await response.json();
	return {
		ok: response.ok,
		status: response.status,
		endpoint: `${API_BASE_URL}${path}`,
		latencyMs: Math.round(performance_default.now() - started),
		receivedAt: envelope.receivedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
		data: envelope.data
	};
}
async function patch(path, body) {
	const started = performance_default.now();
	const url = `${BACKEND_URL}${API_BASE_URL}${path}`;
	const response = await fetch(url, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	});
	const envelope = await response.json();
	return {
		ok: response.ok,
		status: response.status,
		endpoint: `${API_BASE_URL}${path}`,
		latencyMs: Math.round(performance_default.now() - started),
		receivedAt: envelope.receivedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
		data: envelope.data
	};
}
async function del(path) {
	const started = performance_default.now();
	const url = `${BACKEND_URL}${API_BASE_URL}${path}`;
	const response = await fetch(url, { method: "DELETE" });
	const envelope = await response.json();
	return {
		ok: response.ok,
		status: response.status,
		endpoint: `${API_BASE_URL}${path}`,
		latencyMs: Math.round(performance_default.now() - started),
		receivedAt: envelope.receivedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
		data: envelope.data
	};
}
var dlpApi = {
	login: (email, password) => post("/auth/login", {
		email,
		password
	}),
	logout: () => post("/auth/logout", {}),
	getClassifications: () => get("/classifications"),
	createClassification: (item) => post("/classifications", item),
	updateClassification: (id, patchData) => patch(`/classifications/${id}`, patchData),
	deleteClassification: (id) => del(`/classifications/${id}`),
	getDiscoveryRepositories: () => get("/discovery/repositories"),
	createRepository: (item) => post("/discovery/repositories", item),
	testRepository: (id) => post(`/discovery/repositories/${id}/test`, {}),
	getDiscoveryFindings: () => get("/discovery/findings"),
	updateFinding: (id, patchData) => patch(`/discovery/findings/${id}`, patchData),
	deleteFinding: (id) => del(`/discovery/findings/${id}`),
	getDiscoveryRules: () => get("/discovery/rules"),
	createDiscoveryRule: (rule) => post("/discovery/rules", rule),
	getLineageExamples: () => get("/lineage/examples"),
	recordLineageAction: (item) => post("/lineage/actions", item),
	getIncidents: () => get("/incidents"),
	updateIncident: (id, patchData) => patch(`/incidents/${id}`, patchData),
	getEndpoints: () => get("/endpoints"),
	triggerEndpointAction: (id, action) => post(`/endpoints/${id}/actions`, { action }),
	getCompliance: () => get("/compliance/controls"),
	getMonitorFeed: () => get("/monitoring/events"),
	getReports: () => get("/analytics/reports")
};
/** Generic loader for the API layer: loading, latency, error state and reload trigger. */
function useApi(call, deps = []) {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [latency, setLatency] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [reloadKey, setReloadKey] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		setLatency(null);
		setError(null);
		call().then((response) => {
			if (cancelled) return;
			setData(response.data);
			setLatency(response.latencyMs);
			setLoading(false);
		}).catch((err) => {
			if (cancelled) return;
			const msg = err instanceof Error ? err.message : String(err);
			setError(msg);
			setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [reloadKey, ...deps]);
	return {
		data,
		loading,
		latency,
		error,
		reload: () => setReloadKey((key) => key + 1)
	};
}
function Button$1({ children, variant = "secondary", size = "md", className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: `inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${{
			primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
			secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-accent",
			ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
			danger: "bg-destructive/15 text-destructive border border-destructive/25 hover:bg-destructive/25"
		}[variant]} ${{
			sm: "h-8 px-3 text-xs",
			md: "h-10 px-4 text-sm",
			icon: "size-10"
		}[size]} ${className}`,
		...props,
		children
	});
}
function StatusBadge$1({ level }) {
	const style = {
		Restricted: "bg-danger-soft text-danger",
		Confidential: "bg-warning-soft text-warning",
		Internal: "bg-info-soft text-info",
		Public: "bg-success-soft text-success"
	}[level];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${style}`,
		children: level
	});
}
function Pill({ label, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${{
			danger: "bg-danger-soft text-danger",
			warning: "bg-warning-soft text-warning",
			info: "bg-info-soft text-info",
			success: "bg-success-soft text-success",
			muted: "bg-muted text-muted-foreground"
		}[tone]}`,
		children: label
	});
}
function MetricCard$1({ icon: Icon, label, value, detail, tone, delta = "+8.4%" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-border bg-card p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex size-9 items-center justify-center rounded-md ${tone}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-medium text-success",
					children: delta
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs font-medium text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-2xl font-bold text-foreground",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: detail
			})
		]
	});
}
function Panel({ title, subtitle, action, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `rounded-lg border border-border bg-card p-5 shadow-panel ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-bold",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: subtitle
			})] }), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children
		})]
	});
}
function PageHeader({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-bold uppercase tracking-[0.22em] text-primary",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-2xl font-bold sm:text-3xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground sm:text-sm",
				children: description
			})
		] }), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: actions
		})]
	});
}
function ApiBadge({ endpoint, latency }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "hidden items-center gap-2 rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[10px] text-muted-foreground sm:inline-flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${latency === null ? "bg-warning" : "bg-success"}` }),
			"GET ",
			endpoint,
			latency !== null ? ` · ${latency}ms` : " · loading"
		]
	});
}
function TableSkeleton({ rows = 5 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2 p-4",
		children: Array.from({ length: rows }).map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 animate-pulse rounded-md bg-muted/60" }, index))
	});
}
var navGroups = [
	{
		label: "Overview",
		items: [{
			name: "Security Overview",
			icon: LayoutDashboard
		}]
	},
	{
		label: "Data Security",
		items: [
			{
				name: "Data Discovery",
				icon: Database
			},
			{
				name: "Data Classification",
				icon: ScanSearch
			},
			{
				name: "Data Lineage",
				icon: GitBranch
			}
		]
	},
	{
		label: "Policy",
		items: [{
			name: "Policies",
			icon: ShieldCheck
		}, {
			name: "Compliance",
			icon: LockKeyhole
		}]
	},
	{
		label: "Operations",
		items: [
			{
				name: "Incidents",
				icon: TriangleAlert
			},
			{
				name: "Endpoints",
				icon: HardDrive
			},
			{
				name: "Real-Time Monitoring",
				icon: Zap
			}
		]
	},
	{
		label: "Intelligence",
		items: [
			{
				name: "Reporting & Analytics",
				icon: Activity
			},
			{
				name: "UEBA",
				icon: Users
			},
			{
				name: "Risk Analytics",
				icon: FingerprintPattern
			}
		]
	},
	{
		label: "Administration",
		items: [{
			name: "Integrations",
			icon: Network
		}, {
			name: "Settings",
			icon: Settings
		}]
	}
];
function Button({ children, variant = "secondary", size = "md", className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: `inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${{
			primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
			secondary: "border border-border bg-secondary text-secondary-foreground hover:bg-accent",
			ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
			danger: "bg-destructive/15 text-destructive border border-destructive/25 hover:bg-destructive/25"
		}[variant]} ${{
			sm: "h-8 px-3 text-xs",
			md: "h-10 px-4 text-sm",
			icon: "size-10"
		}[size]} ${className}`,
		...props,
		children
	});
}
function StatusBadge({ level }) {
	const style = {
		Restricted: "bg-danger-soft text-danger",
		Confidential: "bg-warning-soft text-warning",
		Internal: "bg-info-soft text-info",
		Public: "bg-success-soft text-success"
	}[level];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${style}`,
		children: level
	});
}
function MetricCard({ icon: Icon, label, value, detail, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-border bg-card p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex size-9 items-center justify-center rounded-md ${tone}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-medium text-success",
					children: "+8.4%"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs font-medium text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-2xl font-bold text-foreground",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: detail
			})
		]
	});
}
function DonutChart({ percent = 82 }) {
	const strokeDashoffset = 302 - 302 * percent / 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative size-36 shrink-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 120 120",
			className: "size-full -rotate-90",
			role: "img",
			"aria-label": `Classified data coverage ${percent} percent`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "48",
				fill: "none",
				className: "stroke-muted",
				strokeWidth: "12"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r: "48",
				fill: "none",
				className: "stroke-primary",
				strokeWidth: "12",
				strokeLinecap: "round",
				strokeDasharray: "302",
				strokeDashoffset
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-2xl font-bold",
				children: [percent, "%"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] text-muted-foreground",
				children: "covered"
			})]
		})]
	});
}
function NewClassificationModal({ onClose, onCreated }) {
	const [step, setStep] = (0, import_react.useState)(1);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [method, setMethod] = (0, import_react.useState)("AI-assisted");
	const [scope, setScope] = (0, import_react.useState)("All connected sources");
	const [sensitivity, setSensitivity] = (0, import_react.useState)("Confidential");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)("");
	const canContinue = step !== 1 || name.trim().length > 2;
	async function handleCreate() {
		setSubmitting(true);
		setErrorMsg("");
		try {
			const res = await dlpApi.createClassification({
				name: name.trim(),
				...description.trim() ? { description: description.trim() } : {},
				sensitivity,
				source: scope
			});
			if (res.ok) {
				setDone(true);
				onCreated();
			} else setErrorMsg(`Backend returned status ${res.status}`);
		} catch (e) {
			setErrorMsg(e instanceof Error ? e.message : "Failed to connect to backend API server");
		} finally {
			setSubmitting(false);
		}
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Classification created",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-lg border border-border bg-popover p-8 text-center shadow-modal",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex size-12 items-center justify-center rounded-full bg-success-soft text-success",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 24 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-5 text-xl font-bold",
					children: "Classification created on backend"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [name, " has been saved to the backend API and queued for discovery."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					className: "mt-6 w-full",
					onClick: onClose,
					children: "Return to classifications"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-overlay p-3 sm:p-6",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "modal-title",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-modal",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] font-bold uppercase tracking-[0.2em] text-primary",
						children: [
							"Step ",
							step,
							" of 3"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "modal-title",
						className: "mt-1 text-lg font-bold",
						children: "New data classification"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						"aria-label": "Close dialog",
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-3 border-b border-border bg-secondary/40",
					children: [
						"Details",
						"Detection",
						"Review"
					].map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `border-b-2 px-3 py-3 text-center text-xs font-semibold ${step === index + 1 ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`,
						children: [
							index + 1,
							". ",
							item
						]
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-y-auto p-5 sm:p-6",
					children: [
						errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 rounded-md border border-danger/30 bg-danger-soft p-3 text-xs text-danger",
							children: errorMsg
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-2 block text-sm font-semibold",
										htmlFor: "classification-name",
										children: "Classification name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "classification-name",
										value: name,
										onChange: (event) => setName(event.target.value),
										placeholder: "e.g. Customer Financial Records",
										className: "h-11 w-full rounded-md border border-input bg-field px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
									}),
									name.length > 0 && name.trim().length < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-danger",
										children: "Enter at least 3 characters."
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-semibold",
									htmlFor: "description",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "description",
									value: description,
									onChange: (e) => setDescription(e.target.value),
									rows: 3,
									placeholder: "Describe the information this classification should identify.",
									className: "w-full resize-none rounded-md border border-input bg-field p-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-sm font-semibold",
									children: "Sensitivity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
									children: [
										"Restricted",
										"Confidential",
										"Internal",
										"Public"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: sensitivity === item ? "primary" : "secondary",
										size: "sm",
										onClick: () => setSensitivity(item),
										children: item
									}, item))
								})] })
							]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-sm font-semibold",
									children: "Detection method"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [{
										name: "AI-assisted",
										icon: Sparkles,
										copy: "Context-aware discovery with confidence scoring."
									}, {
										name: "Pattern rules",
										icon: FingerprintPattern,
										copy: "Keywords, regular expressions and dictionaries."
									}].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setMethod(item.name),
										className: `rounded-lg border p-4 text-left transition-colors ${method === item.name ? "border-primary bg-primary/10" : "border-border bg-secondary/40 hover:bg-accent"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
												size: 20,
												className: method === item.name ? "text-primary" : "text-muted-foreground"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-3 block text-sm font-bold",
												children: item.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 block text-xs leading-5 text-muted-foreground",
												children: item.copy
											})
										]
									}, item.name))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-semibold",
									htmlFor: "scope",
									children: "Scan scope"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "scope",
									value: scope,
									onChange: (event) => setScope(event.target.value),
									className: "h-11 w-full rounded-md border border-input bg-field px-3 text-sm outline-none focus:border-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All connected sources" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cloud repositories" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Endpoints only" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Email and collaboration" })
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-semibold",
									htmlFor: "patterns",
									children: "Keywords or patterns"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "patterns",
									placeholder: "account number, tax ID, confidential",
									className: "h-11 w-full rounded-md border border-input bg-field px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
								})] })
							]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-bold",
									children: "Review configuration"
								}),
								[
									["Name", name],
									["Sensitivity", sensitivity],
									["Detection", method],
									["Scope", scope]
								].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4 rounded-md border border-border bg-secondary/40 px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-right text-sm font-semibold",
										children: value
									})]
								}, label)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3 rounded-md border border-info/25 bg-info-soft p-3 text-info",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, {
										size: 18,
										className: "shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs leading-5",
										children: "Creating this classification will persist it to your Express backend at /api/v1/classifications."
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						disabled: step === 1 || submitting,
						onClick: () => setStep((current) => current - 1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 }), " Back"]
					}), step < 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "primary",
						disabled: !canContinue,
						onClick: () => setStep((current) => current + 1),
						children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "primary",
						disabled: submitting,
						onClick: handleCreate,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }),
							" ",
							submitting ? "Saving to backend..." : "Create classification"
						]
					})]
				})
			]
		})
	});
}
function ClassificationModule({ notify }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [sensitivity, setSensitivity] = (0, import_react.useState)("All sensitivities");
	const [live, setLive] = (0, import_react.useState)(true);
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const { data, loading, latency, error, reload } = useApi(dlpApi.getClassifications);
	const classifications = data ?? [];
	const filtered = (0, import_react.useMemo)(() => classifications.filter((item) => (sensitivity === "All sensitivities" || item.sensitivity === sensitivity) && `${item.name} ${item.source} ${item.owner}`.toLowerCase().includes(query.toLowerCase())), [
		classifications,
		query,
		sensitivity
	]);
	const totalClassified = (0, import_react.useMemo)(() => {
		if (!classifications.length) return "0";
		let count = 0;
		for (const c of classifications) {
			const parsed = parseInt(c.records.replace(/,/g, ""), 10);
			count += isNaN(parsed) ? 1e3 : parsed;
		}
		return count >= 1e3 ? `${(count / 1e3).toFixed(1)}K` : String(count);
	}, [classifications]);
	const sensitiveRecords = (0, import_react.useMemo)(() => {
		let count = 0;
		for (const c of classifications) if (c.sensitivity === "Restricted" || c.sensitivity === "Confidential") {
			const parsed = parseInt(c.records.replace(/,/g, ""), 10);
			count += isNaN(parsed) ? 1e3 : parsed;
		}
		return count >= 1e3 ? `${(count / 1e3).toFixed(1)}K` : String(count);
	}, [classifications]);
	const dataSourcesCount = (0, import_react.useMemo)(() => {
		return new Set(classifications.map((c) => c.source)).size || 1;
	}, [classifications]);
	const autoClassified = (0, import_react.useMemo)(() => {
		if (!classifications.length) return "0%";
		return `${(classifications.reduce((acc, c) => acc + c.confidence, 0) / classifications.length).toFixed(1)}%`;
	}, [classifications]);
	async function toggleStatus(item) {
		try {
			if ((await dlpApi.updateClassification(item.id, { active: !item.active })).ok) {
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
		const rows = [[
			"Classification",
			"Source",
			"Owner",
			"Sensitivity",
			"Records",
			"Confidence",
			"Status"
		], ...filtered.map((item) => [
			item.name,
			item.source,
			item.owner,
			item.sensitivity,
			item.records,
			`${item.confidence}%`,
			item.active ? "Active" : "Paused"
		])];
		const blob = new Blob([rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "aepttasshield-classifications.csv";
		link.click();
		URL.revokeObjectURL(url);
		notify("Classification inventory exported");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-bold uppercase tracking-[0.22em] text-primary",
					children: "Security Operations"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-bold sm:text-3xl",
					children: "Data Classification"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground sm:text-sm",
					children: "Discover, label and control sensitive information across your enterprise."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiBadge, {
						endpoint: "/api/v1/classifications",
						latency
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: () => {
							reload();
							notify("Classification data refreshed from backend");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), " Refresh"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: live ? "primary" : "secondary",
						onClick: () => setLive(!live),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 16 }),
							" ",
							live ? "Live monitor on" : "Live monitor off"
						]
					})
				]
			})]
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center justify-between rounded-lg border border-danger/40 bg-danger-soft p-4 text-xs text-danger",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-bold",
				children: [
					"Backend connection failed (",
					error,
					")"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-muted-foreground",
				children: ["Make sure the Express backend server is running: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
					className: "rounded bg-field px-1.5 py-0.5 font-mono",
					children: "cd aepttasshield-backend && npm start"
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				variant: "secondary",
				onClick: reload,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), " Retry"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					icon: FileSearch,
					label: "Classified records",
					value: totalClassified,
					detail: `Across ${dataSourcesCount} connected sources`,
					tone: "bg-primary/15 text-primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					icon: FileKey,
					label: "Sensitive records",
					value: sensitiveRecords,
					detail: "Restricted or confidential",
					tone: "bg-danger-soft text-danger"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					icon: Cloud,
					label: "Data sources",
					value: String(dataSourcesCount),
					detail: "All sources reporting",
					tone: "bg-info-soft text-info"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					icon: Bot,
					label: "Auto-classified",
					value: autoClassified,
					detail: "Model accuracy rating",
					tone: "bg-success-soft text-success"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 grid gap-4 xl:grid-cols-[1.15fr_1fr_.9fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-border bg-card p-5 shadow-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: "Classification coverage"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Enterprise data visibility"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {
							size: 17,
							className: "text-muted-foreground"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-center gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DonutChart, { percent: classifications.length > 0 ? Math.round(classifications.filter((c) => c.active).length / classifications.length * 100) : 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 flex-1 space-y-3",
							children: [
								[
									"Classified",
									totalClassified,
									"bg-primary"
								],
								[
									"Sensitive",
									sensitiveRecords,
									"bg-warning"
								],
								[
									"Active policies",
									String(classifications.filter((c) => c.active).length),
									"bg-success"
								]
							].map(([label, value, color]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-2 rounded-full ${color}` }), label]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold",
									children: value
								})]
							}, label))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-border bg-card p-5 shadow-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold",
						children: "Sensitive data by type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Records detected in current classifications"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-4",
						children: [
							[
								"Restricted",
								`${classifications.filter((c) => c.sensitivity === "Restricted").length} types`,
								"w-[50%]"
							],
							[
								"Confidential",
								`${classifications.filter((c) => c.sensitivity === "Confidential").length} types`,
								"w-[35%]"
							],
							[
								"Internal",
								`${classifications.filter((c) => c.sensitivity === "Internal").length} types`,
								"w-[20%]"
							],
							[
								"Public",
								`${classifications.filter((c) => c.sensitivity === "Public").length} types`,
								"w-[10%]"
							]
						].map(([label, value, width]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: value
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-full rounded-full bg-primary ${width}` })
						})] }, label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-lg border border-border bg-card p-5 shadow-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: "Recent scan activity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Live discovery pipeline"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5 text-[10px] font-bold text-success",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-success" }), "LIVE"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-4",
						children: classifications.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { size: 14 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs font-semibold",
										children: item.source
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-muted-foreground",
										children: item.scanned
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[10px] text-muted-foreground",
									children: [
										item.records,
										" analyzed (",
										item.name,
										")"
									]
								})]
							})]
						}, item.id))
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 overflow-hidden rounded-lg border border-border bg-card shadow-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold",
						children: "Classification inventory"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: ["Data served directly from Express backend at ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "font-mono text-primary",
							children: "/api/v1/classifications"
						})]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "danger",
								size: "sm",
								onClick: deleteSelected,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }),
									" Delete selected (",
									selected.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								onClick: exportCsv,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Export"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "primary",
								onClick: () => setShowModal(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), " New classification"]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 border-b border-border bg-secondary/25 p-4 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							size: 15,
							className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Filter inventory...",
							className: "h-9 w-full rounded-md border border-input bg-field pl-9 pr-3 text-xs outline-none focus:border-primary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {
							size: 14,
							className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: sensitivity,
							onChange: (event) => setSensitivity(event.target.value),
							className: "h-9 min-w-44 appearance-none rounded-md border border-input bg-field pl-9 pr-8 text-xs outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All sensitivities" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Restricted" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Confidential" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Internal" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Public" })
							]
						})]
					})]
				}),
				loading && !classifications.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, { rows: 5 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-x-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[960px] text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-secondary/30 text-[10px] uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-12 px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										"aria-label": "Select all classifications",
										checked: selected.length === filtered.length && filtered.length > 0,
										onChange: (event) => setSelected(event.target.checked ? filtered.map((item) => item.id) : []),
										className: "accent-primary"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Classification"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Source"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Owner"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Sensitivity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Records"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Confidence"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Last scan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Status (Click to toggle)"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70 text-xs transition-colors last:border-0 hover:bg-accent/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										"aria-label": `Select ${item.name}`,
										checked: selected.includes(item.id),
										onChange: () => setSelected((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]),
										className: "accent-primary"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-3 py-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 max-w-[250px] truncate text-[10px] text-muted-foreground",
										children: item.description
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.source
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.owner
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { level: item.sensitivity })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 font-semibold",
									children: item.records
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: item.confidence >= 95 ? "text-success" : item.confidence >= 90 ? "text-info" : "text-warning",
										children: [item.confidence, "%"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.scanned
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toggleStatus(item),
										className: "flex items-center gap-1.5 rounded-full px-2 py-1 text-xs hover:bg-accent",
										title: "Click to toggle Active / Paused on backend",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${item.active ? "bg-success" : "bg-muted-foreground"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: item.active ? "font-semibold text-success" : "text-muted-foreground",
											children: item.active ? "Active" : "Paused"
										})]
									})
								})
							]
						}, item.id)) })]
					}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center px-5 py-14 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 28,
								className: "text-muted-foreground"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm font-bold",
								children: "No classifications found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Try changing your search or sensitivity filter, or add one using \"+ New classification\"."
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground",
						children: [
							"Showing ",
							filtered.length,
							" of ",
							classifications.length,
							" classifications from backend",
							selected.length > 0 ? ` · ${selected.length} selected` : ""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "size-8",
								"aria-label": "Previous page",
								disabled: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 15 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "primary",
								className: "size-8 px-0",
								children: "1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "ghost",
								className: "size-8",
								"aria-label": "Next page",
								disabled: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })
							})
						]
					})]
				})
			]
		})
	] }), showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewClassificationModal, {
		onClose: () => setShowModal(false),
		onCreated: () => {
			reload();
			notify("New classification saved to backend");
		}
	})] });
}
function severityTone(value) {
	return value === "Critical" ? "danger" : value === "High" ? "warning" : value === "Medium" ? "info" : "muted";
}
function statusTone(value) {
	return value === "Open" ? "danger" : value === "Investigating" ? "warning" : value === "Contained" ? "info" : "success";
}
function OverviewModule({ onNavigate }) {
	const incidents = useApi(dlpApi.getIncidents);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Security Operations",
				title: "Security Overview",
				description: "Consolidated posture across classification, incidents, endpoints and compliance.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiBadge, {
					endpoint: "/api/v1/incidents",
					latency: incidents.latency
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: ShieldCheck,
						label: "Protection score",
						value: "92",
						detail: "Up 4 points this week",
						tone: "bg-success-soft text-success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Siren,
						label: "Open incidents",
						value: "2",
						detail: "1 critical awaiting triage",
						tone: "bg-danger-soft text-danger",
						delta: "-12%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Laptop,
						label: "Managed endpoints",
						value: "1,248",
						detail: "1,192 fully protected",
						tone: "bg-info-soft text-info"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: FileCheckCorner,
						label: "Compliance",
						value: "83%",
						detail: "5 frameworks tracked",
						tone: "bg-primary/15 text-primary"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 xl:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Risk by business unit",
					subtitle: "Weighted DLP risk index",
					className: "xl:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: [
							["Finance", 92],
							["Engineering", 74],
							["People", 55],
							["Sales", 48],
							["Marketing", 31]
						].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: value
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-primary",
								style: { width: `${value}%` }
							})
						})] }, label))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Jump to module",
					subtitle: "Wider DLP workspace",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: [
							["Data Classification", Sparkles],
							["Incidents", TriangleAlert],
							["Endpoints", Laptop],
							["Reporting & Analytics", ChartColumn],
							["Compliance", FileCheckCorner],
							["Real-Time Monitoring", Radio]
						].map(([name, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onNavigate(name),
							className: "flex h-11 items-center gap-3 rounded-md border border-border bg-secondary/40 px-3 text-left text-xs font-semibold transition-colors hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								size: 16,
								className: "text-primary"
							}), name]
						}, name))
					})
				})]
			})
		]
	});
}
function IncidentsModule({ notify }) {
	const { data, loading, latency, reload } = useApi(dlpApi.getIncidents);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [severity, setSeverity] = (0, import_react.useState)("All severities");
	const [status, setStatus] = (0, import_react.useState)("All statuses");
	const [query, setQuery] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (data) setRows(data);
	}, [data]);
	const filtered = (0, import_react.useMemo)(() => rows.filter((item) => (severity === "All severities" || item.severity === severity) && (status === "All statuses" || item.status === status) && `${item.id} ${item.title} ${item.user} ${item.policy}`.toLowerCase().includes(query.toLowerCase())), [
		rows,
		severity,
		status,
		query
	]);
	async function updateStatus(id, next) {
		setRows((current) => current.map((item) => item.id === id ? {
			...item,
			status: next
		} : item));
		setOpen(null);
		try {
			await dlpApi.updateIncident(id, { status: next });
			notify(`${id} marked ${next.toLowerCase()}`);
		} catch {
			reload();
			notify(`Failed to update ${id} — changes reverted`);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Response",
				title: "Incident Management",
				description: "Triage, assign and resolve data-loss incidents raised by policy engines.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiBadge, {
					endpoint: "/api/v1/incidents",
					latency
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					onClick: reload,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), " Refresh"]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Siren,
						label: "Critical",
						value: String(rows.filter((item) => item.severity === "Critical").length),
						detail: "Immediate action required",
						tone: "bg-danger-soft text-danger",
						delta: "+2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: TriangleAlert,
						label: "Open",
						value: String(rows.filter((item) => item.status === "Open").length),
						detail: "Awaiting triage",
						tone: "bg-warning-soft text-warning",
						delta: "-1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Activity,
						label: "Investigating",
						value: String(rows.filter((item) => item.status === "Investigating").length),
						detail: "Analyst assigned",
						tone: "bg-info-soft text-info",
						delta: "0%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Check,
						label: "Resolved (7d)",
						value: "34",
						detail: "Mean time to close 3.2 hrs",
						tone: "bg-success-soft text-success"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-lg border border-border bg-card shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 border-b border-border bg-secondary/25 p-4 sm:flex-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 15,
								className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search incidents, users, policies...",
								"aria-label": "Search incidents",
								className: "h-9 w-full rounded-md border border-input bg-field pl-9 pr-3 text-xs outline-none focus:border-primary"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: severity,
							onChange: (event) => setSeverity(event.target.value),
							"aria-label": "Filter by severity",
							className: "h-9 min-w-40 rounded-md border border-input bg-field px-3 text-xs outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All severities" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Critical" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "High" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Medium" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Low" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: status,
							onChange: (event) => setStatus(event.target.value),
							"aria-label": "Filter by status",
							className: "h-9 min-w-40 rounded-md border border-input bg-field px-3 text-xs outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All statuses" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Open" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Investigating" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Contained" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Resolved" })
							]
						})
					]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-x-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[900px] text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-secondary/30 text-[10px] uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Incident"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Policy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "User"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Channel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Severity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Raised"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Action"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70 text-xs last:border-0 hover:bg-accent/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: item.id
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 max-w-[260px] truncate text-[10px] text-muted-foreground",
										children: item.title
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.policy
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.user
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.channel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										label: item.severity,
										tone: severityTone(item.severity)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										label: item.status,
										tone: statusTone(item.status)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.raised
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										size: "sm",
										onClick: () => setOpen(item),
										children: "Investigate"
									})
								})
							]
						}, item.id)) })]
					}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-5 py-12 text-center text-xs text-muted-foreground",
						children: "No incidents match the current filters."
					})]
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": `Incident ${open.id}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg rounded-lg border border-border bg-popover shadow-modal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between border-b border-border px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold uppercase tracking-[0.2em] text-primary",
								children: open.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-lg font-bold",
								children: open.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "icon",
								variant: "ghost",
								"aria-label": "Close incident",
								onClick: () => setOpen(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 p-5",
							children: [
								["Policy", open.policy],
								["User", open.user],
								["Channel", open.channel],
								["Data type", open.dataType],
								["Assignee", open.assignee],
								["Raised", open.raised]
							].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4 rounded-md border border-border bg-secondary/40 px-4 py-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right text-xs font-semibold",
									children: value
								})]
							}, label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-end gap-2 border-t border-border px-5 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									variant: "danger",
									onClick: () => updateStatus(open.id, "Investigating"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 15 }), " Escalate"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									onClick: () => updateStatus(open.id, "Contained"),
									children: "Contain"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									variant: "primary",
									onClick: () => updateStatus(open.id, "Resolved"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }), " Resolve"]
								})
							]
						})
					]
				})
			})
		]
	});
}
function EndpointsModule({ notify }) {
	const { data, loading, latency, reload } = useApi(dlpApi.getEndpoints);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("All statuses");
	const [query, setQuery] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (data) setRows(data);
	}, [data]);
	const filtered = rows.filter((item) => (status === "All statuses" || item.status === status) && `${item.host} ${item.user} ${item.location}`.toLowerCase().includes(query.toLowerCase()));
	async function act(item, action) {
		if (action === "Isolate") setRows((current) => current.map((row) => row.id === item.id ? {
			...row,
			status: "Offline"
		} : row));
		try {
			await dlpApi.triggerEndpointAction(item.id, action);
			notify(`${action} applied to ${item.host}`);
		} catch {
			reload();
			notify(`Failed to send ${action} to ${item.host} — reverted`);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Agents",
				title: "Endpoint Management",
				description: "Agent health, policy enforcement and remote containment for managed devices.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiBadge, {
					endpoint: "/api/v1/endpoints",
					latency
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					onClick: reload,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), " Sync agents"]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Laptop,
						label: "Total endpoints",
						value: "1,248",
						detail: "Across 9 locations",
						tone: "bg-primary/15 text-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: ShieldCheck,
						label: "Protected",
						value: "1,192",
						detail: "Agent 4.8.2 current",
						tone: "bg-success-soft text-success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: ShieldAlert,
						label: "At risk",
						value: "38",
						detail: "Policy drift detected",
						tone: "bg-warning-soft text-warning",
						delta: "+5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Wifi,
						label: "Offline > 24h",
						value: "18",
						detail: "Pending re-enrolment",
						tone: "bg-danger-soft text-danger",
						delta: "-3"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-lg border border-border bg-card shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 border-b border-border bg-secondary/25 p-4 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							size: 15,
							className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search hosts, users, sites...",
							"aria-label": "Search endpoints",
							className: "h-9 w-full rounded-md border border-input bg-field pl-9 pr-3 text-xs outline-none focus:border-primary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {
							size: 14,
							className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: status,
							onChange: (event) => setStatus(event.target.value),
							"aria-label": "Filter endpoints",
							className: "h-9 min-w-44 appearance-none rounded-md border border-input bg-field pl-9 pr-8 text-xs outline-none focus:border-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All statuses" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Protected" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "At risk" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Offline" })
							]
						})]
					})]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-x-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[940px] text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-secondary/30 text-[10px] uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Host"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "User"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "OS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Agent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Policy compliance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Last seen"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70 text-xs last:border-0 hover:bg-accent/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: item.host
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[10px] text-muted-foreground",
										children: item.location
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.user
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.os
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: ["v", item.agent]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										label: item.status,
										tone: item.status === "Protected" ? "success" : item.status === "At risk" ? "warning" : "muted"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 w-20 overflow-hidden rounded-full bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `h-full rounded-full ${item.compliance >= 90 ? "bg-success" : item.compliance >= 70 ? "bg-warning" : "bg-danger"}`,
												style: { width: `${item.compliance}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [item.compliance, "%"]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.lastSeen
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "sm",
											onClick: () => act(item, "Policy push"),
											children: "Push policy"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "sm",
											variant: "danger",
											onClick: () => act(item, "Isolate"),
											children: "Isolate"
										})]
									})
								})
							]
						}, item.id)) })]
					}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-5 py-12 text-center text-xs text-muted-foreground",
						children: "No endpoints match the current filters."
					})]
				})]
			})
		]
	});
}
function ReportingModule({ notify }) {
	const { data, loading, latency } = useApi(dlpApi.getReports);
	const [range, setRange] = (0, import_react.useState)("Last 30 days");
	function exportReport(format) {
		notify(`${format} report queued for ${range} (POST /api/v1/analytics/exports)`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Intelligence",
				title: "Reporting & Analytics",
				description: "Trend analysis, channel breakdowns and exportable executive reporting.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiBadge, {
						endpoint: "/api/v1/analytics/reports",
						latency
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: range,
						onChange: (event) => setRange(event.target.value),
						"aria-label": "Reporting period",
						className: "h-10 rounded-md border border-input bg-field px-3 text-sm outline-none focus:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last 7 days" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last 30 days" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Last quarter" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Year to date" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						onClick: () => exportReport("CSV"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " CSV"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "primary",
						onClick: () => exportReport("PDF"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " PDF"]
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: TrendingUp,
						label: "Policy violations",
						value: "1,204",
						detail: range,
						tone: "bg-primary/15 text-primary",
						delta: "-6.2%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: ShieldCheck,
						label: "Blocked transfers",
						value: "486",
						detail: "Prevented data loss events",
						tone: "bg-success-soft text-success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Users,
						label: "Repeat offenders",
						value: "17",
						detail: "Users with 3+ violations",
						tone: "bg-warning-soft text-warning",
						delta: "+2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Cpu,
						label: "Scan throughput",
						value: "4.2M",
						detail: "Objects analysed",
						tone: "bg-info-soft text-info"
					})
				]
			}),
			loading || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-border bg-card p-6 shadow-panel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, { rows: 6 })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 xl:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Violation trend",
						subtitle: `Monthly incident volume · ${range}`,
						className: "xl:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-44 items-end gap-2",
							children: data.trend.map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full rounded-t bg-primary/80 transition-all hover:bg-primary",
									style: { height: `${value}%` },
									title: `${value} incidents`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] text-muted-foreground",
									children: [
										"J",
										"F",
										"M",
										"A",
										"M",
										"J",
										"J",
										"A",
										"S",
										"O",
										"N",
										"D"
									][index]
								})]
							}, index))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Violations by channel",
						subtitle: "Share of detections",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: data.channels.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1.5 flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-bold",
									children: [value, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 overflow-hidden rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary",
									style: { width: `${value}%` }
								})
							})] }, label))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Departmental risk",
						subtitle: "Violations per 100 users",
						className: "xl:col-span-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[600px] text-left text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border text-[10px] uppercase tracking-wider text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3",
											children: "Department"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3",
											children: "Risk index"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3",
											children: "Trend"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-3",
											children: "Top data type"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.departments.map(([label, value], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border/70 last:border-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-semibold",
											children: label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3",
											children: value
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												label: index % 2 === 0 ? "Rising" : "Falling",
												tone: index % 2 === 0 ? "warning" : "success"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-muted-foreground",
											children: [
												"Payment data",
												"Source code",
												"Employee records",
												"Customer PII",
												"Campaign assets"
											][index]
										})
									]
								}, label)) })]
							})
						})
					})
				]
			})
		]
	});
}
function ComplianceModule({ notify }) {
	const { data, loading, latency } = useApi(dlpApi.getCompliance);
	const [framework, setFramework] = (0, import_react.useState)("All frameworks");
	const rows = (data ?? []).filter((item) => framework === "All frameworks" || item.framework === framework);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Governance",
				title: "Compliance",
				description: "Framework coverage, control status and audit evidence for regulated data.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiBadge, {
					endpoint: "/api/v1/compliance/controls",
					latency
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: "primary",
					onClick: () => notify("Audit evidence pack generated (POST /api/v1/compliance/evidence)"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Evidence pack"]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: FileCheckCorner,
						label: "Overall compliance",
						value: "83%",
						detail: "Across 5 frameworks",
						tone: "bg-primary/15 text-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Check,
						label: "Controls compliant",
						value: "3",
						detail: "Fully evidenced",
						tone: "bg-success-soft text-success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: TriangleAlert,
						label: "Partial",
						value: "1",
						detail: "Remediation in progress",
						tone: "bg-warning-soft text-warning",
						delta: "0%"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: ShieldAlert,
						label: "Gaps",
						value: "1",
						detail: "Requires owner action",
						tone: "bg-danger-soft text-danger",
						delta: "+1"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-lg border border-border bg-card shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 border-b border-border bg-secondary/25 p-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-bold",
						children: "Control register"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: framework,
						onChange: (event) => setFramework(event.target.value),
						"aria-label": "Filter by framework",
						className: "h-9 min-w-48 rounded-md border border-input bg-field px-3 text-xs outline-none focus:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All frameworks" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "GDPR" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "PCI DSS 4.0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "HIPAA" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "ISO 27001" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "DPDP Act" })
						]
					})]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[880px] text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border bg-secondary/30 text-[10px] uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Framework"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Control"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Requirement"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Score"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Evidence"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-3",
									children: "Reviewed"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/70 text-xs last:border-0 hover:bg-accent/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 font-semibold",
									children: item.framework
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.control
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.requirement
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										label: item.status,
										tone: item.status === "Compliant" ? "success" : item.status === "Partial" ? "warning" : "danger"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-3 py-3.5 font-semibold",
									children: [item.score, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.evidence
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-3.5 text-muted-foreground",
									children: item.reviewed
								})
							]
						}, `${item.framework}-${item.control}`)) })]
					})
				})]
			})
		]
	});
}
function MonitoringModule() {
	const { latency } = useApi(dlpApi.getMonitorFeed);
	const [live, setLive] = (0, import_react.useState)(true);
	const [events, setEvents] = (0, import_react.useState)(monitorFeed);
	(0, import_react.useEffect)(() => {
		if (!live) return;
		const timer = window.setInterval(() => {
			setEvents((current) => {
				const seed = monitorFeed[Math.floor(Math.random() * monitorFeed.length)];
				const now = /* @__PURE__ */ new Date();
				return [{
					...seed,
					id: `EVT-${Math.floor(Math.random() * 9e4 + 1e4)}`,
					time: now.toTimeString().slice(0, 8)
				}, ...current].slice(0, 14);
			});
		}, 3e3);
		return () => window.clearInterval(timer);
	}, [live]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Operations",
				title: "Real-Time Monitoring",
				description: "Streaming view of data movement decisions across every enforcement point.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiBadge, {
					endpoint: "/api/v1/monitoring/events",
					latency
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					variant: live ? "primary" : "secondary",
					onClick: () => setLive(!live),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { size: 16 }),
						" ",
						live ? "Streaming" : "Paused"
					]
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Activity,
						label: "Events / minute",
						value: "412",
						detail: "Across 1,248 agents",
						tone: "bg-primary/15 text-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: ShieldCheck,
						label: "Blocked today",
						value: "96",
						detail: "Policy enforced in-line",
						tone: "bg-success-soft text-success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: TriangleAlert,
						label: "High-risk actions",
						value: "23",
						detail: "Risk score above 70",
						tone: "bg-warning-soft text-warning",
						delta: "+4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard$1, {
						icon: Wifi,
						label: "Collector health",
						value: "100%",
						detail: "6 collectors online",
						tone: "bg-info-soft text-info",
						delta: "0%"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Live event stream",
				subtitle: live ? "Updating every 3 seconds" : "Stream paused",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5 text-[10px] font-bold text-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full bg-success ${live ? "animate-pulse" : ""}` }), live ? "LIVE" : "IDLE"]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[440px] space-y-2 overflow-y-auto pr-1",
					children: events.map((event, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 rounded-md border border-border bg-secondary/35 p-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs font-semibold",
								children: [
									event.actor,
									" · ",
									event.action
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 truncate text-[10px] text-muted-foreground",
								children: [
									event.destination,
									" · ",
									event.classification,
									" · ",
									event.time
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `font-mono text-[10px] ${event.risk > 70 ? "text-danger" : event.risk > 40 ? "text-warning" : "text-muted-foreground"}`,
								children: ["risk ", event.risk]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								label: event.verdict,
								tone: event.verdict === "Blocked" ? "danger" : event.verdict === "Quarantined" ? "warning" : event.verdict === "Alerted" ? "info" : "success"
							})]
						})]
					}, `${event.id}-${index}`))
				})
			})
		]
	});
}
function ModulePlaceholder({ name, icon: Icon, description, capabilities }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "DLP Workspace",
			title: name,
			description
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-border bg-card p-8 text-center shadow-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex size-12 items-center justify-center rounded-md bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 24 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-5 text-lg font-bold",
					children: [name, " workspace"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-md text-xs leading-6 text-muted-foreground",
					children: "This screen is part of the wider DLP navigation. Interface scope for this prototype covers the modules below; data services are supplied by the local sample API layer."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-6 grid max-w-xl gap-2 sm:grid-cols-2",
					children: capabilities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-md border border-border bg-secondary/40 px-3 py-2.5 text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							size: 14,
							className: "shrink-0 text-success"
						}), item]
					}, item))
				})
			]
		})]
	});
}
var sampleRows = [
	{
		id: "DF-01",
		asset: "Finance Share",
		path: "/finance/settlements/q3.xlsx",
		pattern: "Financial · Card",
		confidence: "High",
		score: 97,
		sample: "4111 •••• •••• 1111",
		fp: false,
		review: false
	},
	{
		id: "DF-02",
		asset: "HR Workspace",
		path: "/people/payroll/2026-09.csv",
		pattern: "PII · National ID",
		confidence: "High",
		score: 92,
		sample: "•••-••-6789",
		fp: false,
		review: false
	},
	{
		id: "DF-03",
		asset: "QA Staging DB",
		path: "staging.customers_mock",
		pattern: "PII · Email",
		confidence: "Low",
		score: 41,
		sample: "t••t@example.com",
		fp: true,
		review: false
	},
	{
		id: "DF-04",
		asset: "Support Mailbox",
		path: "/inbox/ticket-8812.eml",
		pattern: "PII · Phone",
		confidence: "Medium",
		score: 68,
		sample: "+91 ••••• ••210",
		fp: false,
		review: true
	},
	{
		id: "DF-05",
		asset: "Analytics Lake",
		path: "s3://lake/orders/part-0007",
		pattern: "Financial · IBAN",
		confidence: "Medium",
		score: 74,
		sample: "DE89 •••• •••• 3000",
		fp: false,
		review: true
	},
	{
		id: "DF-06",
		asset: "Dev Sandbox",
		path: "/samples/fake_cards.json",
		pattern: "Financial · Card",
		confidence: "Low",
		score: 33,
		sample: "4242 •••• •••• 4242",
		fp: true,
		review: false
	}
];
var tone = {
	High: "success",
	Medium: "warning",
	Low: "muted"
};
function Toggle({ label, hint, on, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex cursor-pointer items-start justify-between gap-3 border-b border-border py-2 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold",
				children: label
			}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-muted-foreground",
				children: hint
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "switch",
			"aria-checked": on,
			"aria-label": label,
			onClick: () => onChange(!on),
			className: `relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 size-4 rounded-full bg-foreground transition-all ${on ? "left-4" : "left-0.5"}` })
		})]
	});
}
function DiscoveryPrecision({ onNotify, onCreateScan }) {
	const [rows, setRows] = (0, import_react.useState)(sampleRows);
	const [threshold, setThreshold] = (0, import_react.useState)(85);
	const [engine, setEngine] = (0, import_react.useState)("Strict Regex + Context ML Engine");
	const [ex, setEx] = (0, import_react.useState)({
		test: true,
		mock: true,
		samples: true,
		staging: false
	});
	const [val, setVal] = (0, import_react.useState)({
		proximity: true,
		luhn: true
	});
	const [quick, setQuick] = (0, import_react.useState)("All");
	const visible = (0, import_react.useMemo)(() => rows.filter((r) => quick === "High" ? r.confidence === "High" : quick === "Review" ? r.review : quick === "Flagged" ? r.fp : true), [rows, quick]);
	const flagged = rows.filter((r) => r.fp).length;
	const high = rows.filter((r) => r.score >= threshold && !r.fp).length;
	const fpr = (flagged / rows.length * 2.4).toFixed(1);
	function exportCsv() {
		const csv = ["Asset,Path,Pattern,Confidence,Score,Sample,FalsePositive", ...rows.map((r) => [
			r.asset,
			r.path,
			r.pattern,
			r.confidence,
			r.score,
			r.sample,
			r.fp
		].map((x) => `"${String(x).replaceAll("\"", "\"\"")}"`).join(","))].join("\n");
		const a = document.createElement("a");
		a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
		a.download = "discovery-precision-report.csv";
		a.click();
		URL.revokeObjectURL(a.href);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-end gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "primary",
						size: "sm",
						onClick: onCreateScan,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), " Create Discovery Scan"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						size: "sm",
						onClick: () => onNotify("Exclusions tuned in bulk for this preview only."),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 14 }), " Bulk Tune Exclusions"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						size: "sm",
						onClick: exportCsv,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " Export Report"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 xl:grid-cols-4",
				children: [
					[
						"Active scans",
						"3",
						"2 full · 1 incremental",
						""
					],
					[
						"High-confidence sensitive assets",
						String(high),
						`≥ ${threshold}% confidence`,
						""
					],
					[
						"False positive rate",
						`${fpr}% FPR`,
						"-0.4% this week",
						"text-success"
					],
					[
						"High-confidence vs unconfirmed",
						`${high} / ${rows.length - high}`,
						"Confirmed / needs review",
						""
					]
				].map(([k, v, d, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-4 shadow-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: k
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-2xl font-bold",
							children: v
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `mt-1 text-[11px] ${c || "text-muted-foreground"}`,
							children: d
						})
					]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-lg border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-bold",
								children: "Detection precision"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 block text-xs text-muted-foreground",
								children: ["Engine", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "mt-1 h-9 w-full rounded-md border border-input bg-field px-3 text-xs text-foreground",
									value: engine,
									onChange: (e) => setEngine(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Strict Regex + Context ML Engine" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Regex only" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "ML classifier only" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confidence threshold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-primary",
									children: [threshold, "%+"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 50,
								max: 99,
								value: threshold,
								onChange: (e) => setThreshold(Number(e.target.value)),
								"aria-label": "Confidence threshold",
								className: "mt-2 w-full accent-primary"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-2 rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary",
									style: { width: `${threshold}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[11px] text-muted-foreground",
								children: "Matches below this score are held as low-grade noise instead of alerting."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-lg border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: "Exclusions & whitelisting"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Exclude test databases",
									on: ex.test,
									onChange: (v) => setEx({
										...ex,
										test: v
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Exclude mock data",
									on: ex.mock,
									onChange: (v) => setEx({
										...ex,
										mock: v
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Exclude sample files",
									on: ex.samples,
									onChange: (v) => setEx({
										...ex,
										samples: v
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									label: "Exclude internal staging",
									on: ex.staging,
									onChange: (v) => setEx({
										...ex,
										staging: v
									})
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-lg border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: "Contextual validation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								label: "Require proximity terms",
								hint: "‘SSN’ or ‘CVV’ must appear near 9–16 digit numbers",
								on: val.proximity,
								onChange: (v) => setVal({
									...val,
									proximity: v
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								label: "Check verification algorithms",
								hint: "Luhn check for cards, IBAN checksum",
								on: val.luhn,
								onChange: (v) => setVal({
									...val,
									luhn: v
								})
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-bold",
						children: "Discovered sensitive data findings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							["All", "All"],
							["High", "High Confidence Only"],
							["Review", "Needs Context Review"],
							["Flagged", "Flagged False Positives"]
						].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "sm",
							variant: quick === k ? "primary" : "secondary",
							onClick: () => setQuick(k),
							children: l
						}, k))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 overflow-x-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[900px] text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
								"Asset / Source",
								"Location / Path",
								"Detected pattern",
								"Confidence",
								"Match sample",
								"False positive",
								"Action"
							].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border p-2 font-semibold",
								children: h
							}, h)) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: visible.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: `border-b border-border ${r.fp ? "opacity-60" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2 font-semibold",
									children: r.asset
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "max-w-[200px] truncate p-2 font-mono text-[11px] text-muted-foreground",
									children: r.path
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2",
									children: r.pattern
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										label: `${r.confidence} · ${r.score}%`,
										tone: tone[r.confidence]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2 font-mono",
									children: r.sample
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "sm",
											variant: r.fp ? "secondary" : "danger",
											onClick: () => {
												setRows((o) => o.map((x) => x.id === r.id ? {
													...x,
													fp: !x.fp,
													review: false
												} : x));
												onNotify(r.fp ? "Flag removed (local)." : "Marked as false positive (local).");
											},
											children: r.fp ? "Unflag" : "Mark as False Positive"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "sm",
											variant: "ghost",
											onClick: () => onNotify(`Tune logic for ${r.pattern} opened — preview only.`),
											children: "Tune Logic"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										"aria-label": `Action for ${r.asset}`,
										defaultValue: "",
										className: "h-8 rounded-md border border-input bg-field px-2 text-xs",
										onChange: (e) => {
											if (e.target.value) onNotify(`${e.target.value} recorded locally for ${r.asset}.`);
											e.target.value = "";
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												disabled: true,
												children: "Actions"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Confirm sensitive" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Quarantine" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Add path to exclusions" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Re-scan" })
										]
									})
								})
							]
						}, r.id)) })]
					}), !visible.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-center text-xs text-muted-foreground",
						children: "No findings for this filter."
					})]
				})]
			})
		]
	});
}
var tabs = [
	"False-positive tuning",
	"Dashboard",
	"Repositories",
	"Scan profiles",
	"Classification center",
	"Scan monitor",
	"Findings",
	"Reports"
];
var field = "h-9 w-full rounded-md border border-input bg-field px-3 text-xs text-foreground outline-none focus:border-primary";
function Box({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "min-w-0 rounded-lg border border-border bg-card p-4 sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-4 text-sm font-bold",
			children: title
		}), children]
	});
}
function Label({ name, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5 text-xs font-medium text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: name }), children]
	});
}
function saveCsv(name, rows) {
	const csv = rows.map((row) => row.map((v) => `"${v.replaceAll("\"", "\"\"")}"`).join(",")).join("\r\n");
	const link = document.createElement("a");
	link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
	link.download = name;
	link.click();
	URL.revokeObjectURL(link.href);
}
function DiscoveryWorkspace({ onOpenLineage }) {
	const [tab, setTab] = (0, import_react.useState)("False-positive tuning");
	const [repositories, setRepositories] = (0, import_react.useState)([]);
	const [findings, setFindings] = (0, import_react.useState)([]);
	const { data: apiRepositories, latency: repoLatency, error: repoError, reload: reloadRepos } = useApi(dlpApi.getDiscoveryRepositories);
	const { data: apiFindings, latency: findLatency, error: findError, reload: reloadFindings } = useApi(dlpApi.getDiscoveryFindings);
	(0, import_react.useEffect)(() => {
		if (apiRepositories) setRepositories(apiRepositories);
	}, [apiRepositories]);
	(0, import_react.useEffect)(() => {
		if (apiFindings) setFindings(apiFindings);
	}, [apiFindings]);
	const [notice, setNotice] = (0, import_react.useState)("");
	const [wizard, setWizard] = (0, import_react.useState)(false);
	const [repoType, setRepoType] = (0, import_react.useState)("Endpoint");
	const [repoName, setRepoName] = (0, import_react.useState)("");
	const [repoOwner, setRepoOwner] = (0, import_react.useState)("");
	const [credential, setCredential] = (0, import_react.useState)("");
	const [tested, setTested] = (0, import_react.useState)(false);
	const [profile, setProfile] = (0, import_react.useState)({
		name: "Enterprise sensitive data",
		target: "All sources",
		depth: "Content + OCR",
		schedule: "Daily",
		size: "50",
		types: "pdf, csv, docx",
		exclude: "/temp/**",
		throttle: "25",
		blackout: "00:00–04:00"
	});
	const [rule, setRule] = (0, import_react.useState)({
		name: "National identifier",
		method: "Regex",
		expression: "[0-9]{4}[- ][0-9]{4}",
		test: "",
		sensitivity: "Confidential",
		regulation: "GDPR"
	});
	const [rules, setRules] = (0, import_react.useState)([
		"Payment card · regex",
		"Personal data · EDM",
		"National ID · OCR",
		"Patient record · dictionary"
	]);
	const [fingerprints, setFingerprints] = (0, import_react.useState)(["Customer records · EDM", "Contract templates · IDM"]);
	const [advanced, setAdvanced] = (0, import_react.useState)(false);
	const [scan, setScan] = (0, import_react.useState)({
		state: "Idle",
		progress: 0,
		errors: 0
	});
	const [query, setQuery] = (0, import_react.useState)("");
	const [risk, setRisk] = (0, import_react.useState)("All risks");
	const [regulation, setRegulation] = (0, import_react.useState)("All regulations");
	const [savedViews, setSavedViews] = (0, import_react.useState)([]);
	const [page, setPage] = (0, import_react.useState)(0);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [focus, setFocus] = (0, import_react.useState)(null);
	const [action, setAction] = (0, import_react.useState)("");
	const [reason, setReason] = (0, import_react.useState)("");
	const current = findings.find((f) => f.id === focus);
	const shown = (0, import_react.useMemo)(() => findings.filter((f) => `${f.path} ${f.owner} ${f.repository} ${f.rule}`.toLowerCase().includes(query.toLowerCase()) && (risk === "All risks" || f.risk === risk) && (regulation === "All regulations" || f.regulation === regulation)), [
		findings,
		query,
		risk,
		regulation
	]);
	const pageRows = shown.slice(page * 4, page * 4 + 4);
	function alert(message) {
		setNotice(message);
		window.setTimeout(() => setNotice(""), 4500);
	}
	async function applyAction() {
		if (!reason.trim()) return;
		const ids = focus ? [focus] : selected;
		try {
			await Promise.all(ids.map((id) => {
				if (action === "Delete") return dlpApi.deleteFinding(id);
				return dlpApi.updateFinding(id, {
					status: action,
					...action === "Re-classify" ? { label: "Internal" } : {}
				});
			}));
			reloadFindings();
			alert(`${action} persisted to backend for ${ids.length} finding(s). Reason: ${reason}`);
		} catch {
			alert(`Failed to save ${action} to backend.`);
		}
		setAction("");
		setReason("");
		setSelected([]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Data security / at rest",
				title: "Data Discovery",
				description: "Locate, classify and triage sensitive data across repositories.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiBadge, {
						endpoint: "/api/v1/discovery",
						latency: findLatency ?? repoLatency
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "secondary",
						size: "sm",
						onClick: () => {
							reloadRepos();
							reloadFindings();
							alert("Discovery data refreshed from backend");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), " Refresh"]
					})]
				})
			}),
			(repoError || findError) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-lg border border-danger/40 bg-danger-soft p-4 text-xs text-danger",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-bold",
					children: [
						"Backend connection failed (",
						repoError || findError,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-muted-foreground",
					children: ["Make sure the backend is running: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "rounded bg-field px-1 font-mono",
						children: "npm run backend"
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					variant: "secondary",
					onClick: () => {
						reloadRepos();
						reloadFindings();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), " Retry"]
				})]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "status",
				className: "rounded-md border border-info bg-info-soft px-4 py-3 text-xs text-info",
				children: notice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "tablist",
				"aria-label": "Discovery views",
				className: "flex gap-1 overflow-x-auto border-b border-border pb-2",
				children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					role: "tab",
					"aria-selected": tab === t,
					variant: tab === t ? "primary" : "ghost",
					onClick: () => setTab(t),
					children: t
				}, t))
			}),
			tab === "False-positive tuning" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoveryPrecision, {
				onNotify: (t) => alert(t),
				onCreateScan: () => setTab("Scan profiles")
			}),
			tab === "Dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 xl:grid-cols-4",
					children: [
						["Repositories", repositories.length],
						["Assets indexed", repositories.reduce((n, r) => n + r.assets, 0).toLocaleString()],
						["Sensitive findings", findings.length],
						["High-risk exposures", findings.filter((f) => ["High", "Critical"].includes(f.risk)).length]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-2xl font-bold",
							children: value
						})]
					}, label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							title: "Sensitive inventory by label",
							children: [
								"Restricted",
								"Confidential",
								"Internal",
								"Public"
							].map((label) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex justify-between border-b border-border pb-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: findings.filter((f) => f.label === label).length })]
							}, label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							title: "Risk hotspots by repository",
							children: repositories.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex justify-between border-b border-border pb-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									findings.filter((f) => f.repository === r.name).length,
									" findings · ",
									r.coverage,
									"% covered"
								] })]
							}, r.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
							title: "Regulation coverage",
							children: [
								"GDPR",
								"HIPAA",
								"PCI-DSS",
								"DPDP Act"
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: findings.filter((f) => f.regulation === r).length })]
							}, r))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
							title: "Recent trend",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"Sample findings: 4 last week → ",
										findings.length,
										" now"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 h-2 rounded bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-3/4 rounded bg-warning" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									className: "mt-4",
									size: "sm",
									onClick: () => setTab("Findings"),
									children: ["Review findings ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })]
								})
							]
						})
					]
				})]
			}),
			tab === "Repositories" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				title: "Connected repositories",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "primary",
						size: "sm",
						onClick: () => setWizard(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), " Connect repository"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 md:grid-cols-2",
					children: repositories.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-secondary/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-sm",
									children: r.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										r.type,
										" · ",
										r.owner
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
									label: r.health,
									tone: r.health === "Healthy" ? "success" : r.health === "Attention" ? "warning" : "info"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-xs",
								children: [
									r.assets.toLocaleString(),
									" assets · ",
									r.coverage,
									"% scan coverage"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "sm",
								className: "mt-3",
								onClick: async () => {
									try {
										const res = await dlpApi.testRepository(r.id);
										if (res.ok) {
											reloadRepos();
											alert(res.data.message);
										}
									} catch {
										alert(`Connection check failed for ${r.name}`);
									}
								},
								children: "Test connection"
							})
						]
					}, r.id))
				})]
			}),
			tab === "Scan profiles" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					title: "Profile and scope",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Profile name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: field,
									value: profile.name,
									onChange: (e) => setProfile({
										...profile,
										name: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Target repositories",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: field,
									value: profile.target,
									onChange: (e) => setProfile({
										...profile,
										target: e.target.value
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All sources" }), repositories.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r.name }, r.id))]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Detection rule set",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: field,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Enterprise default" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Regulatory identifiers" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Custom rules" })
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Scan depth",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: field,
									value: profile.depth,
									onChange: (e) => setProfile({
										...profile,
										depth: e.target.value
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Metadata only" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Full content" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Content + OCR" })
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								size: "sm",
								variant: "ghost",
								onClick: () => setAdvanced(!advanced),
								"aria-expanded": advanced,
								children: ["Advanced options ", advanced ? "−" : "+"]
							}),
							advanced && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										name: "Maximum file size (MB)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: field,
											type: "number",
											min: "1",
											value: profile.size,
											onChange: (e) => setProfile({
												...profile,
												size: e.target.value
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										name: "File types",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: field,
											value: profile.types,
											onChange: (e) => setProfile({
												...profile,
												types: e.target.value
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										name: "Excluded paths",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: field,
											value: profile.exclude,
											onChange: (e) => setProfile({
												...profile,
												exclude: e.target.value
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										name: "Throttle (% capacity)",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: field,
											type: "number",
											min: "1",
											max: "100",
											value: profile.throttle,
											onChange: (e) => setProfile({
												...profile,
												throttle: e.target.value
											})
										})
									})
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					title: "Schedule",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Run mode",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: field,
									value: profile.schedule,
									onChange: (e) => setProfile({
										...profile,
										schedule: e.target.value
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "On demand" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Daily" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Weekly" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Incremental" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Event-triggered" })
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Blackout window",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: field,
									value: profile.blackout,
									onChange: (e) => setProfile({
										...profile,
										blackout: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Recurring runs, incremental changes and event triggers are preview settings; no scheduler is connected."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									variant: "primary",
									size: "sm",
									onClick: () => alert(`Profile “${profile.name}” saved in this browser only.`),
									children: "Save profile"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "sm",
									onClick: () => {
										setScan({
											state: "Running",
											progress: 12,
											errors: 0
										});
										setTab("Scan monitor");
									},
									children: "Run scan preview"
								})]
							})
						]
					})
				})]
			}),
			tab === "Classification center" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					title: "Detection rules",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Built-in: email, national ID, payment card, patient record, secrets."
							}),
							rules.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "border-b border-border pb-2 text-xs",
								children: r
							}, r)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Rule name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: field,
									value: rule.name,
									onChange: (e) => setRule({
										...rule,
										name: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Method",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: field,
									value: rule.method,
									onChange: (e) => setRule({
										...rule,
										method: e.target.value
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Regex" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Dictionary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Proximity" })
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Expression or keywords",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: field,
									value: rule.expression,
									onChange: (e) => setRule({
										...rule,
										expression: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Test sample",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: field,
									value: rule.test,
									onChange: (e) => setRule({
										...rule,
										test: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								role: "status",
								className: "text-xs text-info",
								children: ["Test: ", rule.test ? (() => {
									try {
										return rule.method === "Regex" ? new RegExp(rule.expression).test(rule.test) ? "Match detected (sample only)" : "No match" : rule.test.toLowerCase().includes(rule.expression.toLowerCase()) ? "Match detected (sample only)" : "No match";
									} catch {
										return "Invalid expression";
									}
								})() : "Enter text to test"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "sm",
								variant: "primary",
								onClick: async () => {
									if (!rule.name.trim() || !rule.expression.trim()) return alert("Name and expression are required.");
									try {
										const res = await dlpApi.createDiscoveryRule({
											name: rule.name,
											method: rule.method
										});
										if (res.ok) {
											setRules(res.data.rules);
											alert(`Rule "${rule.name}" saved to backend!`);
										}
									} catch {
										alert("Failed to save rule to backend.");
									}
								},
								children: "Add rule"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					title: "Labels and fingerprints",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Sensitivity label",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: field,
									value: rule.sensitivity,
									onChange: (e) => setRule({
										...rule,
										sensitivity: e.target.value
									}),
									children: [
										"Public",
										"Internal",
										"Confidential",
										"Restricted"
									].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								name: "Regulation mapping",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: field,
									value: rule.regulation,
									onChange: (e) => setRule({
										...rule,
										regulation: e.target.value
									}),
									children: [
										"GDPR",
										"HIPAA",
										"PCI-DSS",
										"DPDP Act"
									].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs",
								children: "EDM / IDM fingerprint inventory"
							}),
							fingerprints.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "border-b border-border pb-2 text-xs text-muted-foreground",
								children: x
							}, x)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "sm",
								onClick: () => {
									setFingerprints((old) => [...old, `New fingerprint ${old.length + 1} · EDM`]);
									alert("Fingerprint entry added locally; no sensitive reference data uploaded.");
								},
								children: "Add fingerprint entry"
							})
						]
					})
				})]
			}),
			tab === "Scan monitor" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
				title: "Scan monitor",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							label: scan.state,
							tone: scan.state === "Running" ? "info" : scan.state === "Completed" ? "success" : "muted"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								scan.progress,
								"% complete · ",
								scan.progress * 14,
								" items/min · ",
								scan.errors,
								" errors"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 h-3 rounded-full bg-muted",
						role: "progressbar",
						"aria-valuenow": scan.progress,
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-primary transition-all",
							style: { width: `${scan.progress}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								size: "sm",
								variant: "primary",
								onClick: () => setScan((old) => ({
									...old,
									state: "Running",
									progress: Math.min(100, old.progress + 20)
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 14 }), scan.state === "Paused" ? "Resume" : "Advance preview"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								size: "sm",
								onClick: () => setScan((old) => ({
									...old,
									state: "Paused"
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { size: 14 }), "Pause"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								size: "sm",
								variant: "danger",
								onClick: () => setScan({
									state: "Cancelled",
									progress: 0,
									errors: 0
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 }), "Cancel"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								size: "sm",
								onClick: () => setScan({
									state: "Running",
									progress: 12,
									errors: 0
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), "Retry"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-xs text-muted-foreground",
						children: "Preview controls demonstrate scan states only. No repository is scanned."
					})
				]
			}),
			tab === "Findings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					title: "Findings explorer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										size: 15,
										className: "absolute left-3 top-2.5 text-muted-foreground"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: `${field} pl-9`,
										"aria-label": "Search findings",
										placeholder: "Search path, owner, rule",
										value: query,
										onChange: (e) => {
											setQuery(e.target.value);
											setPage(0);
										}
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: field,
									"aria-label": "Filter risk",
									value: risk,
									onChange: (e) => {
										setRisk(e.target.value);
										setPage(0);
									},
									children: [
										"All risks",
										"Critical",
										"High",
										"Medium",
										"Low"
									].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: field,
									"aria-label": "Filter regulation",
									value: regulation,
									onChange: (e) => {
										setRegulation(e.target.value);
										setPage(0);
									},
									children: [
										"All regulations",
										"GDPR",
										"HIPAA",
										"PCI-DSS",
										"DPDP Act"
									].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "sm",
									onClick: () => {
										const name = window.prompt("Name this view");
										if (name?.trim()) setSavedViews((old) => [...old, `${name.trim()}|${query}|${risk}|${regulation}`]);
									},
									children: "Save view"
								})
							]
						}),
						savedViews.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: savedViews.map((v) => {
								const [name, q, r, reg] = v.split("|");
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "sm",
									variant: "ghost",
									onClick: () => {
										setQuery(q ?? "");
										setRisk(r ?? "All risks");
										setRegulation(reg ?? "All regulations");
										setPage(0);
									},
									children: name
								}, v);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								size: "sm",
								disabled: !selected.length,
								onClick: () => {
									setFocus(null);
									setAction("Bulk dry-run");
								},
								children: [
									"Bulk dry-run (",
									selected.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "sm",
								disabled: !selected.length,
								onClick: () => {
									setFocus(null);
									setAction("Quarantined");
								},
								children: "Quarantine selected"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 overflow-x-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[900px] text-left text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-border text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
										"Select",
										"Path / owner",
										"Label / regulation",
										"Rule / density",
										"Confidence",
										"Risk / exposure",
										"Status",
										""
									].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										scope: "col",
										className: "px-2 py-3 font-medium",
										children: h
									}, h)) })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: pageRows.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												"aria-label": `Select ${f.id}`,
												checked: selected.includes(f.id),
												onChange: () => setSelected((old) => old.includes(f.id) ? old.filter((x) => x !== f.id) : [...old, f.id])
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "max-w-52 px-2 py-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block truncate font-semibold",
												title: f.path,
												children: f.path
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: [
													f.owner,
													" · ",
													f.repository
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge$1, { level: f.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block mt-1",
												children: f.regulation
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-2",
											children: [f.rule, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block text-muted-foreground",
												children: [f.density, " matches"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-2",
											children: [f.confidence, "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												label: f.risk,
												tone: f.risk === "Critical" ? "danger" : f.risk === "High" ? "warning" : "info"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block mt-1",
												children: f.exposure
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2",
											children: f.status
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
												size: "sm",
												onClick: () => setFocus(f.id),
												children: "Inspect"
											})
										})
									]
								}, f.id)) })]
							}), !shown.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-8 text-center text-xs text-muted-foreground",
								children: "No findings match these filters."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								shown.length ? `${page * 4 + 1}–${Math.min((page + 1) * 4, shown.length)}` : 0,
								" of ",
								shown.length
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "icon",
									"aria-label": "Previous findings",
									disabled: page === 0,
									onClick: () => setPage(page - 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "icon",
									"aria-label": "Next findings",
									disabled: (page + 1) * 4 >= shown.length,
									onClick: () => setPage(page + 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
								})]
							})]
						})
					]
				}), current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, {
					title: `Finding ${current.id}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "break-all font-semibold",
									children: current.path
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-muted-foreground",
									children: ["Evidence (masked by default): ", current.snippet]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Matched rule: ",
									current.rule,
									" · confidence ",
									current.confidence,
									"%"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Exposure: ", current.exposure] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-warning",
									children: "Full evidence cannot be revealed in this unauthenticated demo."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap content-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "sm",
								onClick: () => onOpenLineage(current.id),
								children: "Open lineage"
							}), [
								"False positive",
								"Accepted risk",
								"Quarantined",
								"Encrypted / DRM",
								"Sharing restricted",
								"Re-classify",
								"Delete"
							].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "sm",
								variant: a === "Delete" ? "danger" : "secondary",
								onClick: () => setAction(a),
								children: a
							}, a))]
						})]
					})
				})]
			}),
			tab === "Reports" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					title: "Discovery report",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Sensitive inventory, regulation mapping and risk hotspots."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						className: "mt-4",
						size: "sm",
						onClick: () => saveCsv("discovery-report.csv", [[
							"Repository",
							"Type",
							"Assets",
							"Coverage"
						], ...repositories.map((r) => [
							r.name,
							r.type,
							String(r.assets),
							String(r.coverage)
						])]),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Export inventory CSV"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Box, {
					title: "Finding evidence register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Exports masked evidence only. No full sensitive content is included."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						className: "mt-4",
						size: "sm",
						onClick: () => saveCsv("findings-report.csv", [[
							"ID",
							"Path",
							"Risk",
							"Regulation",
							"Evidence",
							"Status"
						], ...findings.map((f) => [
							f.id,
							f.path,
							f.risk,
							f.regulation,
							f.snippet,
							f.status
						])]),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), " Export findings CSV"]
					})]
				})]
			}),
			wizard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4",
				role: "presentation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "dialog",
					"aria-modal": "true",
					"aria-label": "Connect repository",
					className: "w-full max-w-lg rounded-lg border border-border bg-popover p-5 shadow-modal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold",
								children: "Connect repository"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "icon",
								variant: "ghost",
								"aria-label": "Close",
								onClick: () => setWizard(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									name: "Repository type",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										className: field,
										value: repoType,
										onChange: (e) => {
											setRepoType(e.target.value);
											setTested(false);
										},
										children: [
											"Endpoint",
											"Cloud storage",
											"Network share",
											"Database",
											"Mailbox"
										].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									name: "Display name",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										value: repoName,
										onChange: (e) => setRepoName(e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									name: "Owner",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										value: repoOwner,
										onChange: (e) => setRepoOwner(e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									name: "Access credential (write-only)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: field,
										type: "password",
										autoComplete: "off",
										value: credential,
										onChange: (e) => {
											setCredential(e.target.value);
											setTested(false);
										},
										placeholder: "Not shown after connection"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-warning",
									children: "Credentials are validated and stored on the backend server."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "sm",
									onClick: () => {
										if (!repoName.trim() || !repoOwner.trim()) return alert("Enter a name and owner.");
										setTested(true);
									},
									children: "Test connection"
								}),
								tested && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "status",
									className: "text-xs text-info",
									children: "Ready to connect to backend."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "sm",
								onClick: () => setWizard(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "sm",
								variant: "primary",
								disabled: !tested,
								onClick: async () => {
									try {
										const res = await dlpApi.createRepository({
											name: repoName.trim(),
											type: repoType,
											...repoOwner.trim() ? { owner: repoOwner.trim() } : {}
										});
										if (res.ok) {
											reloadRepos();
											setCredential("");
											setRepoName("");
											setRepoOwner("");
											setTested(false);
											setWizard(false);
											alert(`Repository "${res.data.name}" added and saved to backend!`);
										}
									} catch {
										alert("Failed to connect repository on backend.");
									}
								},
								children: "Add repository"
							})]
						})
					]
				})
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "dialog",
					"aria-modal": "true",
					"aria-label": "Confirm finding action",
					className: "w-full max-w-md rounded-lg border border-border bg-popover p-5 shadow-modal",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: action === "Bulk dry-run" ? "Preview bulk action" : `Confirm ${action}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: action === "Delete" ? "Destructive action: removes finding from backend database." : "Updates finding status on the backend API."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							name: "Reason / justification",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: `${field} mt-4 h-20 py-2`,
								value: reason,
								onChange: (e) => setReason(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "sm",
								onClick: () => {
									setAction("");
									setReason("");
								},
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								size: "sm",
								variant: action === "Delete" ? "danger" : "primary",
								disabled: !reason.trim(),
								onClick: applyAction,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), " Confirm"]
							})]
						})
					]
				})
			})
		]
	});
}
var sampleFlows = [
	{
		id: "L-01",
		time: "02:00:04",
		source: "Production DB",
		system: "PostgreSQL",
		process: "etl-daily-backup",
		target: "Backup Vault (S3)",
		transform: "AES-256 encryption",
		risk: "Low",
		trust: 99,
		sensitivity: "Restricted",
		verified: true,
		knownEtl: true,
		resolution: ""
	},
	{
		id: "L-02",
		time: "03:15:22",
		source: "Customer CRM",
		system: "Salesforce",
		process: "anonymizer-v3",
		target: "Customer Analytics Lake",
		transform: "SHA-256 hash · PII masked",
		risk: "Low",
		trust: 96,
		sensitivity: "Confidential",
		verified: true,
		knownEtl: true,
		resolution: ""
	},
	{
		id: "L-03",
		time: "09:41:10",
		source: "Production DB",
		system: "PostgreSQL",
		process: "user:r.mehta",
		target: "Personal Drive",
		transform: "None",
		risk: "High",
		trust: 18,
		sensitivity: "Restricted",
		verified: false,
		knownEtl: false,
		resolution: ""
	},
	{
		id: "L-04",
		time: "11:05:37",
		source: "HR Workspace",
		system: "Workday",
		process: "payroll-sync",
		target: "Payroll Engine",
		transform: "Tokenized IDs",
		risk: "Med",
		trust: 72,
		sensitivity: "Confidential",
		verified: false,
		knownEtl: false,
		resolution: ""
	}
];
var pipeline = [
	{
		name: "Production DB",
		kind: "Origin",
		icon: Database,
		badges: ["Encrypted"]
	},
	{
		name: "ETL Pipeline / Anonymizer",
		kind: "Processing",
		icon: Workflow,
		badges: ["Anonymized / Masked"]
	},
	{
		name: "Customer Analytics Lake",
		kind: "Destination",
		icon: ShieldCheck,
		badges: ["Authorized Pathway"]
	}
];
var sel = "h-9 rounded-md border border-input bg-field px-3 text-xs";
function LineageProvenance({ onNotify }) {
	const [flows, setFlows] = (0, import_react.useState)(sampleFlows);
	const [system, setSystem] = (0, import_react.useState)("All sources");
	const [process, setProcess] = (0, import_react.useState)("All processes");
	const [sens, setSens] = (0, import_react.useState)("All sensitivity");
	const [onlyUnverified, setOnlyUnverified] = (0, import_react.useState)(false);
	const [hideEtl, setHideEtl] = (0, import_react.useState)(false);
	const [activeId, setActiveId] = (0, import_react.useState)("L-03");
	const rows = (0, import_react.useMemo)(() => flows.filter((f) => (system === "All sources" || f.system === system) && (process === "All processes" || f.process === process) && (sens === "All sensitivity" || f.sensitivity === sens) && (!onlyUnverified || !f.verified) && (!hideEtl || !f.knownEtl)), [
		flows,
		system,
		process,
		sens,
		onlyUnverified,
		hideEtl
	]);
	const active = flows.find((f) => f.id === activeId) ?? flows[0];
	const resolve = (id, patch, msg) => {
		setFlows((o) => o.map((f) => f.id === id ? {
			...f,
			...patch
		} : f));
		onNotify(`${msg} — recorded in this browser only.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-bold",
					children: "False-positive control bar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "Source system",
							className: sel,
							value: system,
							onChange: (e) => setSystem(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All sources" }), [...new Set(flows.map((f) => f.system))].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							"aria-label": "User or process ID",
							className: sel,
							value: process,
							onChange: (e) => setProcess(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All processes" }), flows.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: f.process }, f.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							"aria-label": "Data sensitivity",
							className: sel,
							value: sens,
							onChange: (e) => setSens(e.target.value),
							children: [
								"All sensitivity",
								"Restricted",
								"Confidential",
								"Internal",
								"Public"
							].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "sm",
							variant: onlyUnverified ? "primary" : "secondary",
							"aria-pressed": onlyUnverified,
							onClick: () => setOnlyUnverified(!onlyUnverified),
							children: "Show Only Unverified Flows"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "sm",
							variant: hideEtl ? "primary" : "secondary",
							"aria-pressed": hideEtl,
							onClick: () => setHideEtl(!hideEtl),
							children: "Hide Known ETL Pathways"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-w-0 rounded-lg border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: "Verified pipeline (DAG)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-col items-stretch gap-2 md:flex-row md:items-center",
							children: pipeline.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 flex-col items-center gap-2 md:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full flex-1 rounded-lg border border-primary/40 bg-accent p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, {
												size: 16,
												className: "text-primary"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase tracking-wider text-muted-foreground",
												children: n.kind
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm font-semibold",
											children: n.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-2 flex flex-wrap gap-1",
											children: n.badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												label: b,
												tone: "success"
											}, b))
										})
									]
								}), i < pipeline.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									size: 18,
									className: "shrink-0 rotate-90 text-info md:rotate-0"
								})]
							}, n.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 text-xs font-bold text-danger",
							children: "Anomalous path"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-col items-stretch gap-2 md:flex-row md:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 rounded-lg border border-border bg-secondary p-3 text-sm font-semibold",
									children: "Production DB"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
									size: 18,
									className: "shrink-0 rotate-90 self-center text-danger md:rotate-0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveId("L-03"),
									className: "flex-1 rounded-lg border border-danger bg-danger-soft p-3 text-left text-sm font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
											size: 15,
											className: "text-danger"
										}), " Personal Drive"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-[11px] font-normal text-danger",
										children: "Unverified · no transform applied"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-[11px] text-muted-foreground",
							children: "Green badges = authorized and sanitized. Red = movement outside a known business process."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-3 rounded-lg border border-border bg-card p-4",
					"aria-label": "Context and anomaly resolution",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-sm font-bold",
							children: ["Context & resolution · ", active.id]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-border bg-secondary/50 p-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "Movement intent & compliance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: `mt-1 flex items-center gap-1 ${active.verified ? "text-success" : "text-warning"}`,
								children: [active.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 13 }), active.verified ? `${active.process === "etl-daily-backup" ? "Automated Daily ETL Backup" : "Whitelisted process"} - Verified Safe` : "No matching whitelisted business process"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-border bg-secondary/50 p-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "Sanitizer status"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
										size: 13,
										className: "text-primary"
									}),
									" Transform applied: ",
									active.transform,
									" → Risk level: ",
									active.transform === "None" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-danger",
										children: "High"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-success",
										children: "Zero"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-border bg-secondary/50 p-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: "False positive resolution"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-muted-foreground",
									children: ["Process ID: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono",
										children: active.process
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										size: "sm",
										variant: "primary",
										onClick: () => resolve(active.id, {
											verified: true,
											knownEtl: true
										}, "Flow pattern white-listed"),
										children: "White-list Flow Pattern"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
										size: "sm",
										onClick: () => resolve(active.id, { resolution: "Suppressed" }, `Alerts suppressed for ${active.process}`),
										children: "Suppress Alert for Process ID"
									})]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-bold",
					children: "Lineage event log & provenance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 overflow-x-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[880px] text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
								"Timestamp",
								"Source engine",
								"Target egress",
								"Transformation",
								"Risk",
								"Trust score",
								"Resolution"
							].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border p-2 font-semibold",
								children: h
							}, h)) })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							onClick: () => setActiveId(f.id),
							className: `cursor-pointer border-b border-border ${f.id === activeId ? "bg-accent" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2 font-mono",
									children: f.time
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-2",
									children: [
										f.source,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: ["· ", f.system]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2",
									children: f.target
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2",
									children: f.transform
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										label: f.risk,
										tone: f.risk === "High" ? "danger" : f.risk === "Med" ? "warning" : "success"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-1.5 w-16 rounded-full bg-muted",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `h-full rounded-full ${f.trust > 80 ? "bg-success" : f.trust > 50 ? "bg-warning" : "bg-danger"}`,
													style: { width: `${f.trust}%` }
												})
											}),
											f.trust,
											"%"
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-2",
									onClick: (e) => e.stopPropagation(),
									children: f.resolution ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										label: f.resolution,
										tone: "muted"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "sm",
											onClick: () => resolve(f.id, {
												resolution: "Authorized",
												verified: true
											}, "Marked as authorized flow"),
											children: "Mark Authorized Flow"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "sm",
											variant: "danger",
											onClick: () => resolve(f.id, { resolution: "Incident raised" }, "Incident raised"),
											children: "Raise Incident"
										})]
									})
								})
							]
						}, f.id)) })]
					}), !rows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-center text-xs text-muted-foreground",
						children: "No flows match these filters."
					})]
				})]
			})
		]
	});
}
var Canvas = (0, import_react.lazy)(() => import("./lineage-canvas-D1kZVwu9.mjs").then((m) => ({ default: m.LineageCanvas })));
var defaultFlow = {
	id: "",
	name: "Loading...",
	sensitivity: "Internal",
	owner: "",
	events: []
};
var EMPTY_EXAMPLES = [];
var channels = [
	"Endpoint",
	"Network/Web",
	"Cloud",
	"Email",
	"Mobile",
	"USB",
	"AI/LLM"
];
var input = "h-9 w-full rounded-md border border-input bg-field px-3 text-xs outline-none focus:border-primary";
function download(name, content, mime) {
	const link = document.createElement("a");
	link.href = URL.createObjectURL(new Blob([content], { type: mime }));
	link.download = name;
	link.click();
	URL.revokeObjectURL(link.href);
}
function LineageWorkspace({ findingId, onOpenDiscovery }) {
	const { data: apiExamples, loading, latency, error, reload } = useApi(dlpApi.getLineageExamples);
	const activeExamples = apiExamples && apiExamples.length > 0 ? apiExamples : EMPTY_EXAMPLES;
	const [flowId, setFlowId] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [channel, setChannel] = (0, import_react.useState)("All channels");
	const [risk, setRisk] = (0, import_react.useState)("All risks");
	const [eventType, setEventType] = (0, import_react.useState)("All actions");
	const [step, setStep] = (0, import_react.useState)(0);
	const [depth, setDepth] = (0, import_react.useState)(7);
	const [view, setView] = (0, import_react.useState)("Graph");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (activeExamples.length > 0 && !flowId && activeExamples[0]) setFlowId(activeExamples[0].id);
	}, [activeExamples, flowId]);
	(0, import_react.useEffect)(() => {
		if (findingId && activeExamples.some((x) => x.id === findingId)) {
			setFlowId(findingId);
			setStep(0);
		}
	}, [findingId, activeExamples]);
	const flow = activeExamples.find((x) => x.id === flowId) ?? activeExamples[0] ?? defaultFlow;
	const filteredFlows = activeExamples.filter((x) => `${x.name} ${x.id} ${x.owner} ${x.sensitivity} ${x.events.map((e) => `${e.actor} ${e.device} ${e.destination} ${e.policy}`).join(" ")}`.toLowerCase().includes(query.toLowerCase()));
	const events = (0, import_react.useMemo)(() => flow.events.filter((e) => (channel === "All channels" || e.channel === channel) && (risk === "All risks" || e.risk === risk) && (eventType === "All actions" || e.action === eventType)).slice(0, depth), [
		flow,
		channel,
		risk,
		eventType,
		depth
	]);
	const active = events[Math.min(step, events.length - 1)];
	const selected = flow.events.find((e) => e.id === selectedId);
	function notify(text) {
		setNotice(text);
		window.setTimeout(() => setNotice(""), 4e3);
	}
	function setFilter(key, value) {
		const params = new URLSearchParams(window.location.search);
		value ? params.set(key, value) : params.delete(key);
		history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
	}
	async function confirmAction(action) {
		const reason = window.prompt(`Reason for ${action}?`);
		if (reason?.trim()) try {
			const evId = selectedId || active?.id;
			await dlpApi.recordLineageAction({
				action,
				flowId: flow.id,
				...evId ? { eventId: evId } : {},
				reason: reason.trim()
			});
			notify(`${action} persisted to backend API. Reason: ${reason.trim()}`);
		} catch {
			notify(`${action} recording failed on backend.`);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Data security / in motion",
				title: "Data Lineage",
				description: "Trace sensitive data, investigate violations and follow egress paths.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApiBadge, {
						endpoint: "/api/v1/lineage/examples",
						latency
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "secondary",
						size: "sm",
						onClick: () => {
							reload();
							notify("Lineage refreshed from backend");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), " Refresh"]
					})]
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-lg border border-danger/40 bg-danger-soft p-4 text-xs text-danger",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-bold",
					children: [
						"Backend connection failed (",
						error,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-muted-foreground",
					children: ["Make sure the backend is running: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "rounded bg-field px-1 font-mono",
						children: "npm run backend"
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
					size: "sm",
					variant: "secondary",
					onClick: reload,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), " Retry"]
				})]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "status",
				className: "rounded-md border border-info bg-info-soft p-3 text-xs",
				children: notice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineageProvenance, { onNotify: notify }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									size: 15,
									className: "absolute left-3 top-2.5 text-muted-foreground"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									"aria-label": "Search lineage",
									className: `${input} pl-9`,
									value: query,
									onChange: (e) => {
										setQuery(e.target.value);
										setFilter("search", e.target.value);
									},
									placeholder: "File, hash, user, device, destination, incident..."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Filter channel",
								className: input,
								value: channel,
								onChange: (e) => {
									setChannel(e.target.value);
									setStep(0);
									setFilter("channel", e.target.value === "All channels" ? "" : e.target.value);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All channels" }), channels.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								"aria-label": "Filter risk",
								className: input,
								value: risk,
								onChange: (e) => {
									setRisk(e.target.value);
									setStep(0);
									setFilter("risk", e.target.value === "All risks" ? "" : e.target.value);
								},
								children: [
									"All risks",
									"Critical",
									"High",
									"Medium",
									"Low"
								].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								"aria-label": "Filter action",
								className: input,
								value: eventType,
								onChange: (e) => {
									setEventType(e.target.value);
									setStep(0);
									setFilter("action", e.target.value === "All actions" ? "" : e.target.value);
								},
								children: [
									"All actions",
									"Allowed",
									"Warned",
									"Blocked"
								].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [filteredFlows.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							size: "sm",
							variant: x.id === flowId ? "primary" : "secondary",
							onClick: () => {
								setFlowId(x.id);
								setStep(0);
								setSelectedId(null);
								setFilter("flow", x.id);
							},
							children: [
								x.id,
								" · ",
								x.name
							]
						}, x.id)), !filteredFlows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "No matching flows."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { size: 14 }),
							" Time: last 24 hours · Sensitivity: ",
							flow.sensitivity,
							" · Policy: all · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "URL filters update as you explore" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: [
					["Tracked events", flow.events.length],
					["Channels", new Set(flow.events.map((e) => e.channel)).size],
					["Violations", flow.events.filter((e) => e.action === "Blocked").length],
					["Risk", flow.events.some((e) => e.risk === "Critical") ? "Critical" : "High"]
				].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xl font-bold",
						children: v
					})]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "min-w-0 rounded-lg border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: "Lineage canvas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								flow.name,
								" · ",
								flow.owner,
								" · ",
								flow.sensitivity
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "sm",
									variant: view === "Graph" ? "primary" : "secondary",
									onClick: () => setView("Graph"),
									children: "Graph"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "sm",
									variant: view === "Table" ? "primary" : "secondary",
									onClick: () => setView("Table"),
									children: "Table"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									"aria-label": "Graph depth",
									value: depth,
									onChange: (e) => setDepth(Number(e.target.value)),
									className: `${input} w-auto`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 3,
											children: "Depth 3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 5,
											children: "Depth 5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: 7,
											children: "All nodes"
										})
									]
								})
							]
						})]
					}),
					view === "Graph" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
						fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-[360px] animate-pulse bg-muted" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
							events,
							activeId: active?.id ?? "",
							onSelect: (id) => setSelectedId(id)
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[650px] text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
								"Time",
								"Channel",
								"Node",
								"Actor",
								"Destination",
								"Action"
							].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "border-b border-border p-2",
								children: x
							}, x)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: e.time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: e.channel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
											size: "sm",
											variant: "ghost",
											onClick: () => setSelectedId(e.id),
											children: e.name
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: e.actor
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: e.destination
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-2",
										children: e.action
									})
								]
							}, e.id)) })]
						})
					}),
					!events.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-center text-xs",
						children: "No events match the filters."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: "Legend: purple = selected · red = policy violation · blue arrows = data transfer. Drag to pan; use zoom controls and minimap."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-bold",
					children: "Channel flow tracks"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: channels.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[100px_1fr] items-center gap-2 border-b border-border py-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: c
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [flow.events.filter((e) => e.channel === c).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								size: "sm",
								variant: e.action === "Blocked" ? "danger" : "secondary",
								onClick: () => setSelectedId(e.id),
								children: [
									e.time,
									" · ",
									e.name
								]
							}, e.id)), !flow.events.some((e) => e.channel === c) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "—"
							})]
						})]
					}, c))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: "Timeline playback"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								const index = events.findIndex((e) => e.action === "Blocked");
								if (index >= 0) {
									setStep(index);
									setSelectedId(events[index]?.id ?? null);
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 14 }), " First violation"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex gap-1",
						children: events.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "sm",
							variant: i === step ? "primary" : e.action === "Blocked" ? "danger" : "secondary",
							className: "min-w-0 flex-1 overflow-hidden px-1",
							title: `${e.time} ${e.name}`,
							onClick: () => {
								setStep(i);
								setSelectedId(e.id);
							},
							children: e.time
						}, e.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-4 w-full accent-primary",
						type: "range",
						"aria-label": "Scrub timeline",
						min: 0,
						max: Math.max(0, events.length - 1),
						value: Math.min(step, Math.max(0, events.length - 1)),
						onChange: (e) => setStep(Number(e.target.value))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "icon",
								"aria-label": "Previous event",
								disabled: step === 0,
								onClick: () => setStep(step - 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-2 text-center text-xs",
								children: active ? `${active.time} · ${active.name} · ${active.action}` : "No event"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "icon",
								"aria-label": "Next event",
								disabled: step >= events.length - 1,
								onClick: () => setStep(step + 1),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: "Flow analytics"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Source → destination · top egress paths"
						}),
						flow.events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-2 border-b border-border pb-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1 truncate",
								children: [
									e.name,
									" → ",
									e.destination
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								label: e.risk,
								tone: e.risk === "Critical" || e.risk === "High" ? "danger" : "info"
							})]
						}, e.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs text-warning",
							children: "Anomaly: external egress attempts are highlighted where a policy blocked transfer."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: "Actions and evidence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Persisted policy and evidence controls."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								[
									"Open incident",
									"Block destination",
									"Quarantine copy",
									"Trigger re-scan",
									"Send to SIEM/SOAR"
								].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
									size: "sm",
									onClick: () => confirmAction(a),
									children: a
								}, a)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									size: "sm",
									onClick: onOpenDiscovery,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 }), " Open Discovery finding"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									size: "sm",
									onClick: () => download(`lineage-${flow.id}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="80"><rect width="600" height="80" fill="#182038"/><text x="15" y="40" fill="white">${flow.name.replaceAll("&", "&amp;")} - ${flow.events.length} events</text></svg>`, "image/svg+xml"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " SVG summary"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
									size: "sm",
									onClick: () => download(`lineage-${flow.id}-evidence.csv`, [[
										"Time",
										"Node",
										"Channel",
										"Actor",
										"Destination",
										"Action",
										"Policy"
									].join(","), ...flow.events.map((e) => [
										e.time,
										e.name,
										e.channel,
										e.actor,
										e.destination,
										e.action,
										e.policy
									].map((x) => `"${x.replaceAll("\"", "\"\"")}"`).join(","))].join("\n"), "text/csv"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " Evidence CSV"]
								})
							]
						})
					]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex justify-end bg-overlay",
				onClick: () => setSelectedId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					role: "dialog",
					"aria-modal": "true",
					"aria-label": "Event context",
					className: "h-full w-full max-w-md overflow-y-auto border-l border-border bg-popover p-5 shadow-modal",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-bold",
								children: "Event context"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "icon",
								variant: "ghost",
								"aria-label": "Close context",
								onClick: () => setSelectedId(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								selected.time,
								" · ",
								selected.channel
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 font-bold",
							children: selected.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3 text-xs",
							children: [
								["Actor", selected.actor],
								["User risk score", selected.risk === "Critical" ? "92 / 100" : "36 / 100"],
								["Device", selected.device],
								["Device health", "Protected (sample)"],
								["IP / location", "Masked · internal network"],
								["Destination", selected.destination],
								["Policy", selected.policy],
								["Action", selected.action],
								["Process tree", "agent → browser → transfer"],
								["Event metadata", selected.note]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-3 border-b border-border pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "max-w-[60%] text-right",
									children: v
								})]
							}, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-xs text-warning",
							children: "Sensitive details remain masked; no role-based reveal is available in this demo."
						})
					]
				})
			})
		]
	});
}
var defaultUser = {
	name: "S. Dutta",
	email: "admin@aepttas.io",
	role: "Security Admin",
	initials: "SD",
	permissions: []
};
function DlpApp() {
	const [session] = (0, import_react.useState)(defaultUser);
	const [view, setView] = (0, import_react.useState)("Data Classification");
	const [lineageFinding, setLineageFinding] = (0, import_react.useState)(null);
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)("");
	function notify(message) {
		setNotice(message);
		window.setTimeout(() => setNotice(""), 2400);
	}
	function go(next) {
		setView(next);
		setSidebarOpen(false);
		if (typeof window !== "undefined") window.scrollTo({ top: 0 });
	}
	async function signOut() {
		await dlpApi.logout();
		notify("Signed out (demo mode — reload to sign back in)");
		setView("Data Classification");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed right-4 top-4 z-[70] flex items-center gap-2 rounded-md border border-success/30 bg-popover px-4 py-3 text-sm font-semibold shadow-modal",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					size: 16,
					className: "text-success"
				}), notice]
			}),
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "Close navigation",
				className: "fixed inset-0 z-30 bg-overlay lg:hidden",
				onClick: () => setSidebarOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-border bg-sidebar transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-[72px] items-center gap-3 border-b border-border px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-black tracking-wide",
								children: ["AEPTTAS", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "SHIELD"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[9px] uppercase tracking-[0.18em] text-muted-foreground",
								children: "Enterprise DLP"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								size: "icon",
								variant: "ghost",
								className: "ml-auto lg:hidden",
								"aria-label": "Close navigation",
								onClick: () => setSidebarOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 overflow-y-auto px-3 py-4",
						"aria-label": "Primary navigation",
						children: navGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1.5 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-nav-label",
								children: group.label
							}), group.items.map((item) => {
								const active = view === item.name;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => go(item.name),
									"aria-current": active ? "page" : void 0,
									className: `mb-1 flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "bg-primary/20 text-foreground ring-1 ring-inset ring-primary/35" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
											size: 18,
											className: active ? "text-primary" : ""
										}),
										item.name,
										active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto size-1.5 rounded-full bg-primary" })
									]
								}, item.name);
							})]
						}, group.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "m-3 rounded-lg border border-border bg-secondary/60 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex size-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-success" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold",
								children: "Agent Network"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 pl-4 text-[9px] text-muted-foreground",
							children: "1,248 endpoints operational"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-[260px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex h-[72px] items-center gap-3 border-b border-border bg-header/95 px-4 backdrop-blur sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "icon",
							variant: "ghost",
							className: "lg:hidden",
							onClick: () => setSidebarOpen(true),
							"aria-label": "Open navigation",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative max-w-md flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 17,
								className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "h-10 w-full rounded-md border border-input bg-field pl-10 pr-3 text-xs outline-none placeholder:text-muted-foreground focus:border-primary",
								placeholder: "Search data, incidents, endpoints...",
								"aria-label": "Global search"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "icon",
							variant: "secondary",
							"aria-label": "Help",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
							size: "icon",
							variant: "secondary",
							"aria-label": "Notifications",
							className: "relative",
							onClick: () => notify("3 unread security notifications"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-2 top-2 size-1.5 rounded-full bg-danger" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-2 sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground",
								children: session.initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden xl:block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold",
									children: session.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] text-muted-foreground",
									children: session.role
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							size: "icon",
							variant: "secondary",
							"aria-label": "Sign out",
							onClick: signOut,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 17 })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "mx-auto max-w-[1500px] px-4 py-5 sm:px-6 sm:py-7",
					children: [
						view === "Security Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewModule, { onNavigate: go }),
						view === "Data Classification" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassificationModule, { notify }),
						view === "Incidents" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentsModule, { notify }),
						view === "Endpoints" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndpointsModule, { notify }),
						view === "Reporting & Analytics" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportingModule, { notify }),
						view === "Compliance" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplianceModule, { notify }),
						view === "Real-Time Monitoring" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitoringModule, {}),
						view === "Data Discovery" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscoveryWorkspace, { onOpenLineage: (id) => {
							setLineageFinding(id);
							go("Data Lineage");
						} }),
						view === "Data Lineage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineageWorkspace, {
							findingId: lineageFinding,
							onOpenDiscovery: () => go("Data Discovery")
						}),
						view === "Policies" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModulePlaceholder, {
							name: "Policies",
							icon: ShieldCheck,
							description: "Author and publish DLP enforcement policies across channels.",
							capabilities: [
								"Policy builder",
								"Channel enforcement rules",
								"Exception approvals",
								"Version history"
							]
						}),
						view === "UEBA" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModulePlaceholder, {
							name: "UEBA",
							icon: Users,
							description: "Behavioural analytics for insider risk and anomalous data access.",
							capabilities: [
								"User risk scoring",
								"Peer group baselines",
								"Anomaly timeline",
								"Watchlists"
							]
						}),
						view === "Risk Analytics" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModulePlaceholder, {
							name: "Risk Analytics",
							icon: Users,
							description: "Quantify data risk exposure across business units.",
							capabilities: [
								"Risk heatmaps",
								"Exposure forecasting",
								"Control effectiveness",
								"Board-level summaries"
							]
						}),
						view === "Integrations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModulePlaceholder, {
							name: "Integrations",
							icon: Network,
							description: "Connect cloud platforms, SIEM, identity and collaboration tools.",
							capabilities: [
								"Connector catalogue",
								"API credentials",
								"Sync health",
								"Webhook events"
							]
						}),
						view === "Settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModulePlaceholder, {
							name: "Settings",
							icon: Settings,
							description: "Manage tenant configuration, roles and administrator preferences.",
							capabilities: [
								"Role based access",
								"Notification rules",
								"Retention settings",
								"Audit log"
							]
						})
					]
				})]
			})
		]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DlpApp, {});
}
//#endregion
export { Index as component };
