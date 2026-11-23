# Portafolio · Ángel Jafet Contreras Carranza

**AJC OS**: el portafolio es un sistema operativo propio que corre en el navegador.

- **Arranque tipo BIOS** y escritorio con iconos, widgets (reloj de Choluteca, estado, sistemas en producción) y barra de tareas.
- **Ventanas** que se arrastran, redimensionan, minimizan y maximizan. En celular se abren a pantalla completa.
- **Apps**: Sobre mí, Proyectos (explorador de archivos), Experiencia (línea de proceso), **SQL Studio** (consultas reales sobre los datos del portafolio), Terminal, Data Center (stack), **Báscula** (pesado + etiqueta con QR de contacto), Certificaciones, visor del CV, Tickets (contacto) y Papelera (con sorpresas).
- **Menú inicio**, notificaciones y pantalla de apagado.

Hecho con **Next.js 15 + React 19 + TypeScript + Tailwind CSS 4**, sin librerías de interfaz. No necesita base de datos ni variables de entorno.

## Ejecutar en tu computadora

Requisitos: [Node.js 20 o superior](https://nodejs.org).

```bash
npm install
npm run dev
```

Abre http://localhost:3007

## Editar el contenido

Todo el texto está en **`app/data.ts`**: perfil, trayectoria, proyectos, stack y certificaciones.

Pendientes recomendados:

1. Pon tus enlaces de **GitHub** y **LinkedIn** en `perfil.github` y `perfil.linkedin`. Los botones aparecen solos cuando tienen valor.
2. Agrega **capturas con datos de prueba** de tus proyectos en `public/capturas/` y muéstralas en `components/os/apps/Proyectos.tsx` (donde dice "capturas con datos de prueba"). No publiques datos reales de la empresa.
3. Si actualizas el CV, reemplaza `public/CV_Angel_Jafet_Contreras.pdf`.

## Publicar gratis en Vercel

1. Sube esta carpeta a un repositorio nuevo en GitHub (por ejemplo `portafolio`).
2. Entra a https://vercel.com con tu cuenta de GitHub → **Add New → Project** → elige el repositorio → **Deploy**.
3. Vercel te da una dirección como `portafolio-angel.vercel.app`. Ponla en tu CV, tu LinkedIn y tus correos de postulación.

Cada vez que hagas `git push`, Vercel publica los cambios automáticamente.

## Estructura

```
app/
  data.ts              ← contenido (edita aquí)
  page.tsx             ← monta el escritorio
  globals.css          ← colores y animaciones
components/os/
  Escritorio.tsx       ← escritorio, ventanas, menú inicio, barra de tareas
  Ventana.tsx          ← ventana arrastrable
  Arranque.tsx         ← pantalla de arranque
  Iconos.tsx           ← iconos de las apps
  apps/                ← Sobre mí, Proyectos, SQL Studio, etc.
components/
  Bascula.tsx · Terminal.tsx · Ticket.tsx · LineaProceso.tsx · Racks.tsx
public/
  CV_Angel_Jafet_Contreras.pdf
```
