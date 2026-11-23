"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { perfil } from "@/app/data";

type Estado = "vacia" | "pesando" | "estable" | "impresa";

// Simula la báscula industrial del módulo de pesado automático:
// la lectura oscila, se estabiliza y luego "imprime" una etiqueta con QR
// que contiene la tarjeta de contacto (vCard).
export default function Bascula() {
  const [estado, setEstado] = useState<Estado>("vacia");
  const [peso, setPeso] = useState(0);
  const [qr, setQr] = useState<string>("");
  const [lote] = useState(() => `CHO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${perfil.nombre}`,
      `TITLE:${perfil.titulo}`,
      `TEL;TYPE=CELL:${perfil.telefono.replace(/[^+\d]/g, "")}`,
      `EMAIL:${perfil.correo}`,
      `ADR:;;;${perfil.ubicacion};;;`,
      "END:VCARD",
    ].join("\n");
    QRCode.toDataURL(vcard, { margin: 1, width: 220, color: { dark: "#0b1016", light: "#ffffff" } })
      .then(setQr)
      .catch(() => setQr(""));
  }, []);

  useEffect(() => () => {
    if (frame.current) cancelAnimationFrame(frame.current);
  }, []);

  const colocar = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    const objetivo = 42 + Math.random() * 14; // libras
    const inicio = performance.now();
    const duracion = 2200;
    setEstado("pesando");

    const paso = (t: number) => {
      const p = Math.min((t - inicio) / duracion, 1);
      // sobreoscilación amortiguada + ruido, como una báscula real
      const amort = Math.exp(-4 * p);
      const valor = objetivo * (1 - amort * Math.cos(9 * p)) + (1 - p) * (Math.random() - 0.5) * 3;
      setPeso(Math.max(0, valor));
      if (p < 1) {
        frame.current = requestAnimationFrame(paso);
      } else {
        setPeso(objetivo);
        setEstado("estable");
      }
    };
    frame.current = requestAnimationFrame(paso);
  }, []);

  const reiniciar = () => {
    if (frame.current) cancelAnimationFrame(frame.current);
    setPeso(0);
    setEstado("vacia");
  };

  const textoEstado = {
    vacia: "ESPERANDO CANASTA",
    pesando: "LEYENDO COM3…",
    estable: "PESO ESTABLE",
    impresa: "ETIQUETA IMPRESA",
  }[estado];

  return (
    <div className="panel relative w-full max-w-md p-5 shadow-2xl shadow-black/40">
      <div className="mb-3 flex items-center justify-between font-mono text-[11px] text-planta-400">
        <span>ESTACIÓN · CLASIFICADO</span>
        <span className="flex items-center gap-1.5">
          <span
            className={`led ${estado === "pesando" ? "led-parpadea text-ambar" : estado === "vacia" ? "text-planta-600" : "text-led-verde"}`}
            aria-hidden
          />
          {textoEstado}
        </span>
      </div>

      <div
        className="display-bascula flex items-baseline justify-end gap-2 rounded-lg border border-planta-700 px-4 py-5"
        role="status"
        aria-live="polite"
        aria-label={`Peso: ${peso.toFixed(1)} libras`}
      >
        <span className="text-5xl font-bold tabular-nums sm:text-6xl">{peso.toFixed(1).padStart(5, " ")}</span>
        <span className="text-lg">lb</span>
      </div>

      {/* plato de la báscula */}
      <div className="relative mx-auto mt-4 h-14 w-full">
        <div
          className={`absolute left-1/2 top-0 h-9 w-40 -translate-x-1/2 rounded-md border border-ambar/60 bg-ambar-suave transition-all duration-500 ${
            estado === "vacia" ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
          }`}
          aria-hidden
        >
          <div className="grid h-full grid-cols-6 gap-0.5 p-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="rounded-sm bg-ambar/30" />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-3 rounded-sm bg-planta-700" aria-hidden />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-sm">
        {estado === "vacia" || estado === "pesando" ? (
          <button
            onClick={colocar}
            disabled={estado === "pesando"}
            className="col-span-2 rounded-lg bg-ambar px-4 py-2.5 font-semibold text-planta-950 transition hover:brightness-110 disabled:opacity-50"
          >
            {estado === "pesando" ? "Pesando…" : "▶ Colocar canasta"}
          </button>
        ) : (
          <>
            <button
              onClick={() => setEstado("impresa")}
              className="rounded-lg bg-turquesa px-3 py-2.5 font-semibold text-planta-950 transition hover:brightness-110"
            >
              🖨 Imprimir etiqueta
            </button>
            <button
              onClick={reiniciar}
              className="rounded-lg border border-planta-600 px-3 py-2.5 text-planta-300 transition hover:border-planta-400"
            >
              ↺ Tarar
            </button>
          </>
        )}
      </div>

      {estado === "impresa" && (
        <div className="imprimiendo mt-4 rounded-md bg-white p-3 text-planta-950 shadow-lg">
          <div className="flex gap-3">
            {qr && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qr} alt="Código QR con mi tarjeta de contacto" className="h-24 w-24 shrink-0" />
            )}
            <dl className="grid grid-cols-[auto_1fr] gap-x-2 font-mono text-[11px] leading-snug">
              <dt className="font-bold">CANDIDATO</dt>
              <dd>{perfil.nombreCorto}</dd>
              <dt className="font-bold">TALLA</dt>
              <dd>Dev + Infra</dd>
              <dt className="font-bold">LOTE</dt>
              <dd>{lote}</dd>
              <dt className="font-bold">PESO</dt>
              <dd>{peso.toFixed(1)} lb</dd>
              <dt className="font-bold">ORIGEN</dt>
              <dd>Choluteca, HN</dd>
              <dt className="font-bold">ESTADO</dt>
              <dd className="font-bold text-emerald-700">DISPONIBLE</dd>
            </dl>
          </div>
          <p className="mt-2 border-t border-dashed border-planta-300 pt-1.5 text-center font-mono text-[10px] text-planta-600">
            Escanea el QR para guardar mi contacto
          </p>
        </div>
      )}
    </div>
  );
}
