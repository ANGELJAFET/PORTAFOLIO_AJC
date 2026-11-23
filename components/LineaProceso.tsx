"use client";

import { useState } from "react";
import { lineaDeProceso } from "@/app/data";

// La trayectoria como una línea de planta: la canasta viaja por la banda
// hasta la estación seleccionada.
export default function LineaProceso() {
  const [activa, setActiva] = useState(lineaDeProceso.length - 1);
  const total = lineaDeProceso.length;
  const posicion = total > 1 ? (activa / (total - 1)) * 100 : 0;
  const etapa = lineaDeProceso[activa];

  return (
    <div className="panel p-5 sm:p-7">
      {/* banda transportadora */}
      <div className="relative mx-2 mb-8 mt-10 sm:mx-6">
        <div className="banda h-3 rounded-full border border-planta-700 bg-planta-900" aria-hidden />
        <div
          className="absolute -top-9 h-7 w-10 -translate-x-1/2 rounded border border-ambar bg-ambar-suave transition-[left] duration-700 ease-out"
          style={{ left: `${posicion}%` }}
          aria-hidden
        >
          <div className="grid h-full grid-cols-3 gap-px p-0.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="rounded-[2px] bg-ambar/40" />
            ))}
          </div>
        </div>
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between" aria-hidden>
          {lineaDeProceso.map((e, i) => (
            <span
              key={e.id}
              className={`h-5 w-5 rounded-full border-2 transition ${
                i <= activa ? "border-ambar bg-planta-950" : "border-planta-600 bg-planta-900"
              }`}
            />
          ))}
        </div>
      </div>

      <div role="tablist" aria-label="Etapas de mi trayectoria" className="grid grid-cols-3 gap-2">
        {lineaDeProceso.map((e, i) => (
          <button
            key={e.id}
            role="tab"
            aria-selected={i === activa}
            onClick={() => setActiva(i)}
            className={`rounded-lg border px-2 py-2.5 text-left transition sm:px-4 ${
              i === activa
                ? "border-ambar bg-ambar-suave"
                : "border-planta-700 hover:border-planta-500 hover:bg-planta-800"
            }`}
          >
            <span className="block font-mono text-[10px] text-planta-400 sm:text-xs">{e.estacion}</span>
            <span className="block text-sm font-semibold sm:text-base">{e.titulo}</span>
          </button>
        ))}
      </div>

      <div key={etapa.id} role="tabpanel" className="mt-6 grid gap-4 sm:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-mono text-xs text-ambar">{etapa.periodo}</p>
          <h3 className="mt-1 text-2xl font-bold">{etapa.titulo}</h3>
          <p className="mt-1 text-sm text-planta-300">{etapa.lugar}</p>
        </div>
        <ul className="space-y-2">
          {etapa.puntos.map((p) => (
            <li key={p} className="flex gap-3 text-planta-100">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-turquesa" aria-hidden />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
