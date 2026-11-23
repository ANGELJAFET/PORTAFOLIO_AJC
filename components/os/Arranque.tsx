"use client";

import { useEffect, useState } from "react";
import { LogoAJC } from "./Iconos";

const LINEAS = [
  "AJC BIOS v26.11 — Choluteca, Honduras",
  "CPU: Full Stack Developer @ producción ............ OK",
  "Memoria: Next.js · React · Node.js · SQL Server ..... OK",
  "Detectando básculas en COM3 ........................ OK",
  "Montando dbo.Portafolio ............................ OK",
  "Iniciando servicios de red (UniFi) ................. OK",
  "Cargando AJC OS…",
];

// Pantalla de arranque. Se puede saltar con clic o cualquier tecla.
export default function Arranque({ onFin }: { onFin: () => void }) {
  const [n, setN] = useState(0);
  const [fase, setFase] = useState<"bios" | "logo" | "salida">("bios");

  useEffect(() => {
    if (fase !== "bios") return;
    if (n < LINEAS.length) {
      const t = setTimeout(() => setN((x) => x + 1), n === 0 ? 250 : 170);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setFase("logo"), 250);
    return () => clearTimeout(t);
  }, [n, fase]);

  useEffect(() => {
    if (fase === "logo") {
      const t = setTimeout(() => setFase("salida"), 1300);
      return () => clearTimeout(t);
    }
    if (fase === "salida") {
      const t = setTimeout(onFin, 450);
      return () => clearTimeout(t);
    }
  }, [fase, onFin]);

  useEffect(() => {
    const saltar = () => setFase("salida");
    window.addEventListener("keydown", saltar);
    return () => window.removeEventListener("keydown", saltar);
  }, []);

  return (
    <div
      onClick={() => setFase("salida")}
      className={`fixed inset-0 z-[9999] cursor-pointer bg-black transition-opacity duration-500 ${fase === "salida" ? "opacity-0" : "opacity-100"}`}
      role="status"
      aria-label="Iniciando AJC OS"
    >
      {fase === "bios" ? (
        <div className="p-6 font-mono text-[13px] leading-6 text-planta-300 sm:p-10">
          {LINEAS.slice(0, n).map((l) => (
            <div key={l}>
              {l.endsWith("OK") ? (
                <>
                  {l.slice(0, -2)}
                  <span className="text-led-verde">OK</span>
                </>
              ) : (
                l
              )}
            </div>
          ))}
          <span className="cursor-terminal">▌</span>
        </div>
      ) : (
        <div className="grid h-full place-items-center">
          <div className="flex flex-col items-center gap-6">
            <div className="animate-[pulse_1.6s_ease-in-out_infinite]">
              <LogoAJC tamano={84} />
            </div>
            <p className="font-mono text-sm tracking-[0.4em] text-planta-300">AJC OS</p>
            <div className="h-1 w-48 overflow-hidden rounded-full bg-planta-800">
              <div className="barra-carga h-full rounded-full bg-gradient-to-r from-ambar to-turquesa" />
            </div>
          </div>
        </div>
      )}
      <p className="absolute bottom-6 left-0 right-0 text-center font-mono text-[11px] text-planta-600">clic o cualquier tecla para saltar</p>
    </div>
  );
}
