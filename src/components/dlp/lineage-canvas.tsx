import { useCallback, useMemo, useState } from "react";
import { ReactFlow, Background, Controls, MiniMap, MarkerType, type Edge, type Node, type NodeMouseHandler } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export type JourneyEvent = { id: string; name: string; channel: string; time: string; actor: string; device: string; destination: string; action: string; risk: string; policy: string; note: string };

export function LineageCanvas({ events, activeId, onSelect }: { events: JourneyEvent[]; activeId: string; onSelect: (id: string) => void }) {
  const [depth, setDepth] = useState(7);
  const visible = events.slice(0, depth);
  const nodes: Node[] = useMemo(() => visible.map((event, index) => ({
    id: event.id,
    position: { x: index * 240, y: index % 2 ? 110 : 40 },
    data: { label: `${event.channel} · ${event.name}${event.action === "Blocked" ? " · BLOCKED" : ""}` },
    style: { width: 190, background: `var(${event.action === "Blocked" ? "--danger-soft" : event.id === activeId ? "--accent" : "--card"})`, color: "var(--foreground)", border: `1px solid var(${event.action === "Blocked" ? "--danger" : event.id === activeId ? "--primary" : "--border"})`, borderRadius: 6, fontSize: 12, padding: 12 },
  })), [visible, activeId]);
  const edges: Edge[] = useMemo(() => visible.slice(1).flatMap((event, index) => { const previous = visible[index]; return previous ? [{ id: `edge-${event.id}`, source: previous.id, target: event.id, animated: event.action === "Blocked", style: { stroke: `var(${event.action === "Blocked" ? "--danger" : "--info"})` }, markerEnd: { type: MarkerType.ArrowClosed, color: `var(${event.action === "Blocked" ? "--danger" : "--info"})` } }] : []; }), [visible]);
  const handleClick: NodeMouseHandler = useCallback((_, node) => onSelect(node.id), [onSelect]);
  return <div className="h-[360px] w-full overflow-hidden rounded-md border border-border bg-field" aria-label="Interactive lineage graph">
    <ReactFlow nodes={nodes} edges={edges} onNodeClick={handleClick} fitView nodesDraggable={false} nodesConnectable={false} colorMode="dark" proOptions={{ hideAttribution: true }}>
      <Background color="var(--border)" gap={24} />
      <Controls showInteractive={false} />
      <MiniMap nodeColor="var(--primary)" maskColor="var(--overlay)" pannable zoomable />
    </ReactFlow>
    <label className="sr-only" htmlFor="graph-depth">Graph depth</label>
    <select id="graph-depth" className="sr-only" value={depth} onChange={(e) => setDepth(Number(e.target.value))}><option value={3}>3 nodes</option><option value={5}>5 nodes</option><option value={7}>All nodes</option></select>
  </div>;
}