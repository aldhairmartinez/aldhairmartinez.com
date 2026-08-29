// Abstract architecture diagram used as the hero's visual anchor. Pure SVG,
// no client JS — the "draw-in" is a CSS stroke-dasharray animation defined in
// globals.css (.trace-path) that runs once on paint and is disabled under
// prefers-reduced-motion.
export function TopologyGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 280"
      fill="none"
      className={className}
      aria-hidden
      role="presentation"
    >
      <g stroke="var(--color-border-strong)" strokeWidth="1">
        <path
          className="trace-path"
          style={{ ["--trace-length" as string]: 620 }}
          d="M40 60 H160 V40 H320 M160 60 V140 H60 V200 M160 140 H260 V200 H320 M60 200 V240 H160"
        />
      </g>

      {/* nodes */}
      {[
        { x: 40, y: 60, r: 5 },
        { x: 320, y: 40, r: 4 },
        { x: 160, y: 140, r: 6 },
        { x: 60, y: 200, r: 4 },
        { x: 260, y: 200, r: 4 },
        { x: 320, y: 200, r: 4 },
        { x: 160, y: 240, r: 5 },
      ].map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="var(--color-bg-base)"
          stroke="var(--color-accent-secondary)"
          strokeWidth="1.5"
        />
      ))}

      {/* Experimental orange accent — test application, central node only */}
      <circle cx={160} cy={140} r="2" fill="var(--color-accent-orange)" />
    </svg>
  );
}
