import Escritorio from "@/components/os/Escritorio";
import { lineaDeProceso, modulos, perfil } from "./data";

export default function Inicio() {
  return (
    <>
      {/* Resumen accesible para lectores de pantalla y buscadores */}
      <div className="sr-only">
        <h1>
          {perfil.nombre} — {perfil.titulo}
        </h1>
        <p>{perfil.resumen}</p>
        <h2>Proyectos</h2>
        <ul>
          {modulos.map((m) => (
            <li key={m.codigo}>
              {m.nombre}: {m.resumen}
            </li>
          ))}
        </ul>
        <h2>Experiencia</h2>
        <ul>
          {lineaDeProceso.map((e) => (
            <li key={e.id}>
              {e.titulo} — {e.lugar} ({e.periodo})
            </li>
          ))}
        </ul>
        <p>
          Contacto: {perfil.correo} · {perfil.telefono}
        </p>
      </div>
      <main>
        <Escritorio />
      </main>
    </>
  );
}
