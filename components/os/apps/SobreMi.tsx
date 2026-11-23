"use client";

import { perfil, modulos } from "@/app/data";
import { abrirApp } from "../eventos";

export default function SobreMi() {
  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-ambar to-turquesa text-4xl font-bold text-planta-950 shadow-lg">
          ÁC
          <span className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full border border-planta-700 bg-planta-900 px-2 py-0.5 font-mono text-[10px] text-led-verde">
            <span className="led text-led-verde" style={{ width: 6, height: 6 }} /> disponible
          </span>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ambar">{perfil.titulo}</p>
          <h1 className="mt-1 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{perfil.nombre}</h1>
          <p className="mt-1 text-planta-300">⌖ {perfil.ubicacion} · presencial, híbrido o remoto</p>
        </div>
      </div>

      <p className="mt-6 text-xl font-semibold text-ambar">{perfil.lema}</p>
      <p className="mt-2 text-lg leading-relaxed text-planta-100">{perfil.resumen}</p>

      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(modulos[0].metricas ?? []).map((m) => (
          <div key={m.etiqueta} className="rounded-lg border border-planta-700 bg-planta-950/60 p-3">
            <dd className="font-mono text-2xl font-bold text-turquesa">{m.valor}</dd>
            <dt className="text-xs text-planta-400">{m.etiqueta} en GCM PROCESS</dt>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => abrirApp("proyectos")} className="rounded-lg bg-ambar px-4 py-2 font-semibold text-planta-950 hover:brightness-110">
          Ver proyectos
        </button>
        <button onClick={() => abrirApp("cv")} className="rounded-lg border border-planta-600 px-4 py-2 hover:border-ambar hover:text-ambar">
          Abrir CV
        </button>
        <button onClick={() => abrirApp("contacto")} className="rounded-lg border border-planta-600 px-4 py-2 hover:border-turquesa hover:text-turquesa">
          Contactarme
        </button>
        {perfil.github && (
          <a href={perfil.github} target="_blank" rel="noreferrer" className="rounded-lg border border-planta-600 px-4 py-2 hover:border-turquesa">
            GitHub
          </a>
        )}
        {perfil.linkedin && (
          <a href={perfil.linkedin} target="_blank" rel="noreferrer" className="rounded-lg border border-planta-600 px-4 py-2 hover:border-turquesa">
            LinkedIn
          </a>
        )}
      </div>

      <p className="mt-8 rounded-lg border border-dashed border-planta-700 p-3 font-mono text-xs text-planta-400">
        💡 Consejo: este portafolio es un sistema operativo. Abre las apps del escritorio, arrastra las ventanas y prueba la
        terminal o el SQL Studio.
      </p>
    </div>
  );
}
