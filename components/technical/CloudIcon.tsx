// Traced from a pixel-level analysis of the actual Cloudflare mark (its
// alpha channel and color regions were sampled programmatically to extract
// the true silhouette, rather than approximated by eye): a puff-and-dome
// main cloud body sitting on a flat base, with its distinctive separated,
// pointed tail as its own detached shape to the right. Rendered as two
// solid fill="currentColor" polygons — monochrome graphite by default,
// switching to the site's orange accent only when this stage is
// highlighted — never the mark's literal orange/yellow brand colors.
export function CloudIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 44"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        d="M0,43 L0,38.3 L2.7,32 L5.3,29.3 L8,27.7 L10.7,26.7 L13.3,26
           L16,17.3 L18.7,14.7 L21.3,13.7 L24,13.3 L26.7,13.7 L29.3,14.7
           L32,11.3 L34.7,7.7 L37.3,5 L40,3.3 L42.7,2 L45.3,1 L48,0.3
           L50.7,0 L53.3,0 L56,0.3 L58.7,1 L61.3,2.3 L64,3.7 L66.7,5.7
           L66.7,29 L64,43 Z"
      />
      <path
        d="M68,43 L68,7 L70.7,10.3 L73.3,16.3 L76,18.3 L78.7,18.3 L81.3,18.7
           L84,19.7 L86.7,21 L89.3,23 L92,26 L94.7,30.7 L96,37 L94.7,43 Z"
      />
    </svg>
  );
}
