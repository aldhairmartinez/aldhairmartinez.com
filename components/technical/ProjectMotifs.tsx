// Subtle, per-project line-art motifs used as a small header strip on
// project cards. Static (no animation — that's reserved for the hero),
// monochrome, drawn entirely with CSS custom properties from the design
// system. Each is a plain <svg>, no external assets.

const strokeMuted = "var(--color-border-strong)";
const strokeAccent = "var(--color-accent-secondary)";
const fillBase = "var(--color-bg-base)";
const fillOk = "var(--color-status-ok)";

function MotifSvg({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      role="presentation"
    >
      {children}
    </svg>
  );
}

// this-website — a single trace path through a few nodes.
export function TopologyMotif({ className }: { className?: string }) {
  return (
    <MotifSvg className={className}>
      <path
        d="M10 45 H70 V15 H130 V45 H190"
        stroke={strokeMuted}
        strokeWidth={1}
        fill="none"
      />
      <circle cx={10} cy={45} r={3} stroke={strokeAccent} strokeWidth={1.2} fill={fillBase} />
      <circle cx={70} cy={15} r={3} stroke={strokeAccent} strokeWidth={1.2} fill={fillBase} />
      <circle cx={130} cy={45} r={3.5} stroke={strokeAccent} strokeWidth={1.2} fill={fillBase} />
      <circle cx={190} cy={45} r={3} stroke={strokeAccent} strokeWidth={1.2} fill={fillBase} />
      <circle cx={130} cy={45} r={1.4} fill={fillOk} />
    </MotifSvg>
  );
}

// telemetry-optimization-lab — a small trace/span waterfall.
export function StreamMotif({ className }: { className?: string }) {
  const rows: { y: number; spans: { x: number; w: number; o: number }[] }[] = [
    { y: 14, spans: [{ x: 10, w: 40, o: 0.85 }, { x: 60, w: 90, o: 0.4 }] },
    { y: 29, spans: [{ x: 25, w: 20, o: 0.55 }, { x: 55, w: 60, o: 0.8 }, { x: 130, w: 30, o: 0.35 }] },
    { y: 44, spans: [{ x: 10, w: 110, o: 0.3 }, { x: 135, w: 45, o: 0.65 }] },
  ];
  return (
    <MotifSvg className={className}>
      {rows.map((row, i) => (
        <g key={i}>
          {row.spans.map((s, j) => (
            <rect
              key={j}
              x={s.x}
              y={row.y}
              width={s.w}
              height={3}
              rx={1}
              fill={strokeAccent}
              opacity={s.o}
            />
          ))}
        </g>
      ))}
    </MotifSvg>
  );
}

// cloud-native-observability-lab — a denser, distributed service mesh.
export function MeshMotif({ className }: { className?: string }) {
  const nodes = [
    { x: 24, y: 18 },
    { x: 100, y: 12 },
    { x: 176, y: 22 },
    { x: 56, y: 46 },
    { x: 146, y: 46 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 4],
  ];
  return (
    <MotifSvg className={className}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={strokeMuted}
          strokeWidth={1}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 1 ? 3.5 : 3}
          stroke={strokeAccent}
          strokeWidth={1.2}
          fill={fillBase}
        />
      ))}
    </MotifSvg>
  );
}

// ai-assisted-solution-engineering — a terminal / prompt motif.
export function TerminalMotif({ className }: { className?: string }) {
  return (
    <MotifSvg className={className}>
      <rect
        x={10}
        y={10}
        width={180}
        height={40}
        rx={3}
        stroke={strokeMuted}
        strokeWidth={1}
        fill="none"
      />
      <circle cx={18} cy={18} r={1.4} fill={strokeMuted} />
      <circle cx={24} cy={18} r={1.4} fill={strokeMuted} />
      <circle cx={30} cy={18} r={1.4} fill={strokeMuted} />
      <path d="M18 32 L26 38 L18 44" stroke={strokeAccent} strokeWidth={1.3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1={32} y1={44} x2={70} y2={44} stroke={strokeAccent} strokeWidth={1.3} strokeLinecap="round" />
      <rect x={130} y={26} width={40} height={16} rx={2} stroke={strokeMuted} strokeWidth={1} fill="none" />
    </MotifSvg>
  );
}

export const projectMotifs: Record<string, React.ComponentType<{ className?: string }>> = {
  "this-website": TopologyMotif,
  "telemetry-optimization-lab": StreamMotif,
  "cloud-native-observability-lab": MeshMotif,
  "ai-assisted-solution-engineering": TerminalMotif,
};
