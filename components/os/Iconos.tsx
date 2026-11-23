// Iconos propios de AJC OS (SVG en línea, sin dependencias).
import type { ReactNode } from "react";

export type IdApp =
  | "sobre"
  | "proyectos"
  | "experiencia"
  | "sql"
  | "terminal"
  | "stack"
  | "bascula"
  | "certs"
  | "cv"
  | "contacto"
  | "papelera";

const fondos: Record<IdApp, [string, string]> = {
  sobre: ["#f5a524", "#d9740b"],
  proyectos: ["#3b82f6", "#1d4ed8"],
  experiencia: ["#a855f7", "#6d28d9"],
  sql: ["#ef4444", "#b91c1c"],
  terminal: ["#1f2937", "#030712"],
  stack: ["#14b8a6", "#0f766e"],
  bascula: ["#22c55e", "#15803d"],
  certs: ["#eab308", "#a16207"],
  cv: ["#f8fafc", "#cbd5e1"],
  contacto: ["#ec4899", "#be185d"],
  papelera: ["#64748b", "#334155"],
};

const glifos: Record<IdApp, ReactNode> = {
  sobre: (
    <>
      <circle cx="24" cy="19" r="7" fill="#fff" />
      <path d="M11 38c2-8 8-11 13-11s11 3 13 11" fill="#fff" />
    </>
  ),
  proyectos: (
    <>
      <path d="M9 16h11l3 3h16v18H9z" fill="#bfdbfe" />
      <path d="M9 21h30v16H9z" fill="#fff" />
      <rect x="14" y="26" width="12" height="2.5" rx="1" fill="#3b82f6" />
      <rect x="14" y="31" width="18" height="2.5" rx="1" fill="#93c5fd" />
    </>
  ),
  experiencia: (
    <>
      <path d="M10 32h28" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <circle cx="14" cy="32" r="4" fill="#fff" />
      <circle cx="24" cy="32" r="4" fill="#e9d5ff" />
      <circle cx="34" cy="32" r="4" fill="#fff" />
      <rect x="18" y="13" width="12" height="9" rx="2" fill="#fff" />
      <path d="M24 22v6" stroke="#fff" strokeWidth="2" />
    </>
  ),
  sql: (
    <>
      <ellipse cx="24" cy="14" rx="12" ry="4.5" fill="#fff" />
      <path d="M12 14v18c0 2.5 5.4 4.5 12 4.5s12-2 12-4.5V14" fill="#fecaca" />
      <path d="M12 21c0 2.5 5.4 4.5 12 4.5S36 23.5 36 21M12 28c0 2.5 5.4 4.5 12 4.5S36 30.5 36 28" stroke="#b91c1c" strokeWidth="1.6" fill="none" />
    </>
  ),
  terminal: (
    <>
      <path d="M13 17l7 7-7 7" stroke="#34d399" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 32h11" stroke="#e5e7eb" strokeWidth="3.2" strokeLinecap="round" />
    </>
  ),
  stack: (
    <>
      {[12, 21, 30].map((y) => (
        <g key={y}>
          <rect x="11" y={y} width="26" height="7" rx="1.5" fill="#fff" />
          <circle cx="16" cy={y + 3.5} r="1.6" fill="#34d399" />
          <circle cx="21" cy={y + 3.5} r="1.6" fill="#f5a524" />
          <rect x="25" y={y + 2.5} width="9" height="2" rx="1" fill="#99f6e4" />
        </g>
      ))}
    </>
  ),
  bascula: (
    <>
      <rect x="10" y="12" width="28" height="11" rx="2" fill="#052e16" />
      <text x="24" y="21" textAnchor="middle" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#86efac">47.9</text>
      <rect x="20" y="23" width="8" height="6" fill="#dcfce7" />
      <rect x="8" y="29" width="32" height="7" rx="2" fill="#fff" />
    </>
  ),
  certs: (
    <>
      <circle cx="24" cy="20" r="9" fill="#fff" />
      <circle cx="24" cy="20" r="5" fill="#fde047" />
      <path d="M18 27l-3 11 5-3 3 4 1-11M30 27l3 11-5-3-3 4-1-11" fill="#fef9c3" />
    </>
  ),
  cv: (
    <>
      <path d="M14 9h14l7 7v23H14z" fill="#fff" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M28 9v7h7" fill="#e2e8f0" />
      <rect x="11" y="27" width="18" height="9" rx="1.5" fill="#dc2626" />
      <text x="20" y="34" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fontWeight="800" fill="#fff">PDF</text>
    </>
  ),
  contacto: (
    <>
      <path d="M9 17a3 3 0 013-3h24a3 3 0 013 3v4a3 3 0 000 6v4a3 3 0 01-3 3H12a3 3 0 01-3-3v-4a3 3 0 000-6z" fill="#fff" />
      <path d="M30 14v20" stroke="#ec4899" strokeWidth="1.6" strokeDasharray="2 2" />
      <rect x="14" y="20" width="11" height="2.5" rx="1" fill="#f9a8d4" />
      <rect x="14" y="25" width="8" height="2.5" rx="1" fill="#f9a8d4" />
    </>
  ),
  papelera: (
    <>
      <rect x="13" y="15" width="22" height="3" rx="1.5" fill="#fff" />
      <path d="M20 15v-2h8v2" stroke="#fff" strokeWidth="2" fill="none" />
      <path d="M15 19h18l-1.5 18h-15z" fill="#e2e8f0" />
      <path d="M20 23v10M24 23v10M28 23v10" stroke="#64748b" strokeWidth="1.6" />
    </>
  ),
};

export function IconoApp({ id, tamano = 48 }: { id: IdApp; tamano?: number }) {
  const [a, b] = fondos[id];
  const gid = `g-${id}`;
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 48 48" aria-hidden className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.45)]">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="11" fill={`url(#${gid})`} />
      <rect x="2.5" y="2.5" width="43" height="43" rx="10.5" fill="none" stroke="#ffffff30" />
      {glifos[id]}
    </svg>
  );
}

export function LogoAJC({ tamano = 28 }: { tamano?: number }) {
  return (
    <svg width={tamano} height={tamano} viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="logo-ajc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5a524" />
          <stop offset="1" stopColor="#2dd4bf" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#logo-ajc)" />
      <path d="M8 23l5-14h2l5 14M10 18h8" stroke="#070a0e" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 9v10a4 4 0 01-4 4" stroke="#070a0e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}
