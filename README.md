# SGCM · Portal de citas médicas

Portal de citas médicas construido con React y Vite, con una API local y almacenamiento en memoria para usuarios, perfiles y citas.

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
3. Ejecuta `npm run dev` (inicia el portal y su API en `http://localhost:5173`).
4. Registra una cuenta o usa la cuenta de demostración indicada abajo.

## Cuenta de demostración

- Correo: `paciente@sgcm.demo`
- Contraseña: `SGCMdemo123`

## Almacenamiento y funciones

El servidor mantiene usuarios, perfiles, sesiones y citas en memoria. Permite registrarse e iniciar sesión, reservar horarios, consultar, cancelar y solicitar cambios de citas, y actualizar el perfil. Las contraseñas se almacenan con hash mientras vive el proceso.

Los datos son temporales: se reinician cuando se detiene el servidor. Esta base en memoria está pensada para desarrollo y demostraciones, no para producción. Ejecuta `npm run build` para compilar la interfaz; para que las rutas `/api` estén disponibles, inicia el servidor con `npm start`.
