import { racks } from "@/app/data";

// El stack técnico presentado como gabinetes de un data center.
export default function Racks() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {racks.map((r, ri) => (
        <div key={r.nombre} className="rounded-xl border border-planta-700 bg-planta-950 p-2 shadow-inner">
          <div className="mb-2 flex items-center justify-between px-1 font-mono text-[10px] text-planta-400">
            <span>R{String(ri + 1).padStart(2, "0")}</span>
            <span className="text-ambar">{r.nombre}</span>
          </div>
          <ul className="space-y-1">
            {r.items.map((it, i) => (
              <li
                key={it}
                className="group flex items-center gap-2 rounded border border-planta-700 bg-gradient-to-b from-planta-800 to-planta-850 px-2 py-1.5 transition hover:border-turquesa/70"
              >
                <span
                  className="led led-parpadea shrink-0 text-led-verde"
                  style={{ animationDelay: `${(ri * 7 + i * 3) % 10 / 5}s`, width: 6, height: 6 }}
                  aria-hidden
                />
                <span className="truncate font-mono text-[12px] text-planta-100 group-hover:text-turquesa">{it}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-center gap-1" aria-hidden>
            {Array.from({ length: 6 }).map((_, k) => (
              <span key={k} className="h-1 w-3 rounded-full bg-planta-700" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
