# SGCM · Portal de citas médicas

Portal de demostración construido con React y Vite. Sus páginas están organizadas por función para que cada flujo pueda cambiarse por separado.

## Estructura

```text
src/
├── app/                  # Navegación, secciones y estado del portal
├── components/           # Shell, barra lateral, barra superior y contenido inicial
├── features/
│   ├── login/            # Acceso, registro, componentes y estilos
│   ├── appointments/     # Agendar cita, calendario, catálogos y confirmación
│   ├── my-appointments/ # Listado, filtros, acciones y detalle de citas
│   └── my-profile/       # Perfil, contacto, preferencias y edición
├── styles/               # Tokens visuales y estilos compartidos
├── App.jsx               # Entrada de la aplicación
└── main.jsx              # Montaje de React y hojas de estilo
```

Cada `features/<nombre>` mantiene sus datos y componentes de página junto a la función a la que pertenecen. `app/` coordina la navegación y `components/` contiene las piezas compartidas del portal.

## Ejecutar

1. Instala Node.js 18 o superior.
2. Ejecuta `npm install`.
3. Ejecuta `npm run dev`.
4. Abre la URL local que indica Vite.

## Estado de integración

El acceso, registro, perfil, médicos, horarios y citas usan datos de demostración. Las acciones del portal aún no se conectan al backend ni guardan información de forma persistente.