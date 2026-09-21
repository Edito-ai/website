/* --- Pixel-dust diagrams -------------------------------------------------
   Deterministic point clouds in the style of dot-matrix technical
   illustrations — dense where the shape is, scattering to dust at the
   edges. Drawn entirely in code (no imagery), seeded so SSR and the
   client always render the exact same points.
--------------------------------------------------------------------------- */

export interface Point {
  x: number;
  y: number;
  r: number;
  o: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Rounded to sidestep cross-engine ULP differences in Math.sin/cos that
// would otherwise show up as a client/server hydration mismatch.
function round(n: number) {
  return Math.round(n * 100) / 100;
}

function jitter(seed: number, amount = 1.2): [number, number] {
  return [
    (seededRandom(seed) - 0.5) * amount * 2,
    (seededRandom(seed + 1) - 0.5) * amount * 2,
  ];
}

export function line(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  count: number,
  opacity: number,
  seedBase: number,
  r = 1.6,
): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0 : i / (count - 1);
    const [jx, jy] = jitter(seedBase + i, 0.7);
    return { x: round(x0 + (x1 - x0) * t + jx), y: round(y0 + (y1 - y0) * t + jy), r, o: opacity };
  });
}

export function ring(
  cx: number,
  cy: number,
  radius: number,
  count: number,
  opacity: number,
  seedBase: number,
  r = 1.6,
): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const [jx, jy] = jitter(seedBase + i);
    return {
      x: round(cx + Math.cos(angle) * radius + jx),
      y: round(cy + Math.sin(angle) * radius + jy),
      r,
      o: opacity,
    };
  });
}

export function ellipse(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  count: number,
  opacity: number,
  seedBase: number,
  r = 1.6,
): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const [jx, jy] = jitter(seedBase + i, 0.6);
    return {
      x: round(cx + Math.cos(angle) * rx + jx),
      y: round(cy + Math.sin(angle) * ry + jy),
      r,
      o: opacity,
    };
  });
}

// A row of vertical waveform bars, each drawn as a short dotted line.
export function waveform(
  x0: number,
  x1: number,
  count: number,
  cy: number,
  maxHeight: number,
  opacity: number,
  seedBase: number,
): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const x = x0 + (i / (count - 1)) * (x1 - x0);
    const h = 10 + seededRandom(seedBase + i * 5.1) * maxHeight;
    return line(x, cy - h / 2, x, cy + h / 2, Math.max(3, Math.round(h / 7)), opacity, seedBase + i * 13 + 5);
  }).flat();
}

// A single point, rounded like everything else so it stays hydration-safe.
export function dot(x: number, y: number, r: number, o: number): Point {
  return { x: round(x), y: round(y), r, o };
}

export function dust(count: number, x0: number, y0: number, x1: number, y1: number, seedBase: number): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const seed = seedBase + i * 3.7;
    return {
      x: round(x0 + seededRandom(seed) * (x1 - x0)),
      y: round(y0 + seededRandom(seed + 91) * (y1 - y0)),
      r: round(0.5 + seededRandom(seed + 47) * 1),
      o: round(0.04 + seededRandom(seed + 13) * 0.14),
    };
  });
}

export default function PixelDiagram({
  points,
  viewBox = "0 0 320 240",
  className = "h-auto w-full max-w-md text-accent",
}: {
  points: Point[];
  viewBox?: string;
  className?: string;
}) {
  return (
    <svg viewBox={viewBox} role="presentation" aria-hidden className={className}>
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="currentColor" opacity={p.o} />
      ))}
    </svg>
  );
}
