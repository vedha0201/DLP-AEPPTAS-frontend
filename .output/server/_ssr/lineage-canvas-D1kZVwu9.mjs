import { n as __toESM } from "../_runtime.mjs";
import { a as MarkerType, i as index, n as Controls, r as MiniMap, t as Background } from "../_libs/@xyflow/react+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lineage-canvas-D1kZVwu9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LineageCanvas({ events, activeId, onSelect }) {
	const [depth, setDepth] = (0, import_react.useState)(7);
	const visible = events.slice(0, depth);
	const nodes = (0, import_react.useMemo)(() => visible.map((event, index) => ({
		id: event.id,
		position: {
			x: index * 240,
			y: index % 2 ? 110 : 40
		},
		data: { label: `${event.channel} · ${event.name}${event.action === "Blocked" ? " · BLOCKED" : ""}` },
		style: {
			width: 190,
			background: `var(${event.action === "Blocked" ? "--danger-soft" : event.id === activeId ? "--accent" : "--card"})`,
			color: "var(--foreground)",
			border: `1px solid var(${event.action === "Blocked" ? "--danger" : event.id === activeId ? "--primary" : "--border"})`,
			borderRadius: 6,
			fontSize: 12,
			padding: 12
		}
	})), [visible, activeId]);
	const edges = (0, import_react.useMemo)(() => visible.slice(1).flatMap((event, index) => {
		const previous = visible[index];
		return previous ? [{
			id: `edge-${event.id}`,
			source: previous.id,
			target: event.id,
			animated: event.action === "Blocked",
			style: { stroke: `var(${event.action === "Blocked" ? "--danger" : "--info"})` },
			markerEnd: {
				type: MarkerType.ArrowClosed,
				color: `var(${event.action === "Blocked" ? "--danger" : "--info"})`
			}
		}] : [];
	}), [visible]);
	const handleClick = (0, import_react.useCallback)((_, node) => onSelect(node.id), [onSelect]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-[360px] w-full overflow-hidden rounded-md border border-border bg-field",
		"aria-label": "Interactive lineage graph",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(index, {
				nodes,
				edges,
				onNodeClick: handleClick,
				fitView: true,
				nodesDraggable: false,
				nodesConnectable: false,
				colorMode: "dark",
				proOptions: { hideAttribution: true },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Background, {
						color: "var(--border)",
						gap: 24
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controls, { showInteractive: false }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniMap, {
						nodeColor: "var(--primary)",
						maskColor: "var(--overlay)",
						pannable: true,
						zoomable: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "sr-only",
				htmlFor: "graph-depth",
				children: "Graph depth"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				id: "graph-depth",
				className: "sr-only",
				value: depth,
				onChange: (e) => setDepth(Number(e.target.value)),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: 3,
						children: "3 nodes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: 5,
						children: "5 nodes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: 7,
						children: "All nodes"
					})
				]
			})
		]
	});
}
//#endregion
export { LineageCanvas };
