"use client";

import { useState } from "react";
import { modulos } from "@/app/data";

// Explorador de archivos: cada proyecto es una carpeta.
export default function Proyectos() {
  const [sel, setSel] = useState(0);
  const m = modulos[sel];

  return (
    <div className="flex h-full min-h-[420px] flex-col md:flex-row">
      <aside className="shrink-0 border-b border-planta-700 bg-planta-950/50 p-3 md:w-60 md:border-b-0 md:border-r">
        <p className="px-2 pb-2 font-mono text-[11px] text-planta-400">C:\Ángel\Proyectos</p>
        <ul className="flex gap-1 overflow-x-auto md:block md:space-y-1">
          {modulos.map((x, i) => (
            <li key={x.codigo} className="shrink-0">
              <button
                onClick={() => setSel(i)}
                className={`flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm transition ${
                  i === sel ? "bg-ambar-suave text-planta-100 ring-1 ring-ambar/50" : "text-planta-300 hover:bg-planta-800"
                }`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
                  <path d="M2 6h7l2 2h11v12H2z" fill={i === sel ? "#f5a524" : "#3b82f6"} opacity=".9" />
                </svg>
                <span className="whitespace-nowrap">{x.nombre}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <article key={m.codigo} className="min-w-0 flex-1 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="text-planta-400">{m.codigo}</span>
          <span
            className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 ${
              m.estado === "PRODUCCIÓN" ? "border-led-verde/40 text-led-verde" : "border-ambar/40 text-ambar"
            }`}
          >
            <span className={`led ${m.estado === "PRODUCCIÓN" ? "" : "led-parpadea"}`} style={{ width: 6, height: 6 }} />
            {m.estado}
          </span>
        </div>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{m.nombre}</h2>
        <p className="mt-2 text-planta-300">{m.resumen}</p>

        {m.metricas && (
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {m.metricas.map((x) => (
              <div key={x.etiqueta} className="rounded-lg border border-planta-700 bg-planta-950/60 px-3 py-2">
                <div className="font-mono text-xl font-bold text-turquesa">{x.valor}</div>
                <div className="text-[11px] text-planta-400">{x.etiqueta}</div>
              </div>
            ))}
          </div>
        )}

        <h3 className="etiqueta-seccion mt-6">El problema</h3>
        <p className="mt-2">{m.problema}</p>

        <h3 className="etiqueta-seccion mt-6">Lo que construí</h3>
        <ul className="mt-2 space-y-2">
          {m.solucion.map((s) => (
            <li key={s} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-turquesa" aria-hidden />
              <span>{s}</span>
            </li>
          ))}
        </ul>

        <h3 className="etiqueta-seccion mt-6">Stack</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {m.stack.map((s) => (
            <span key={s} className="rounded border border-planta-600 px-2 py-0.5 font-mono text-xs">
              {s}
            </span>
          ))}
        </div>

        {/* Agrega capturas con datos de prueba en /public/capturas y muéstralas aquí */}
        <div className="mt-6 grid place-items-center rounded-lg border border-dashed border-planta-600 bg-planta-950/60 py-8 font-mono text-xs text-planta-400">
          [ capturas con datos de prueba — próximamente ]
        </div>
        {m.nota && <p className="mt-4 text-sm italic text-planta-400">{m.nota}</p>}
      </article>
    </div>
  );
}
