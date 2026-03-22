# 💻 Cine Digital - Frontend (React)

Aplicación cliente interactiva diseñada para ofrecer una experiencia visual premium al gestionar el inventario de películas y series.

---

## ✨ Características de Usuario
- **Diseño Glassmorphism**: Paneles translúcidos con bordes neón y desenfoque.
- **Estado Dinámico**: Uso intensivo de `useState` y `useEffect` para cargas sincronizadas.
- **Componentes UI Reutilizables**:
  - `SkeletonCard`: Efecto de carga moderno mientras los datos se obtienen del API.
  - `MediaDetailModal`: Visualización detallada sin pérdida de contexto.
  - `NavBar` y `Footer`: Navegación consistente.

---

## 🛠️ Tecnologías y Librerías Clave
- **Bootstrap 5**: Grid system y clases de utilidad.
- **Axios**: Configurado en `/services/axiosConfig.js` con una instancia base.
- **React Router DOM v5**: Manejo de Single Page Application (SPA).
- **SweetAlert2**: Mostrado en cada CRUD para confirmar acciones y transacciones exitosas.

---

## 📂 Organización del Proyecto (src)

```text
/components
  /ui       -> NavBar, Footer, Skeletons, Modales
/pages      -> Páginas CRUD (Género, Media, etc.)
/services   -> Clientes de API desacoplados por recurso
/assets     -> Logo y estilos globales (index.css)
```

---

## 🚦 Configuración de Puertos
La aplicación está configurada para conectarse al puerto del backend definido en `src/services/axiosConfig.js`. Por defecto, intenta conectarse a `localhost:4001` (o 4000 según configuración).

Para iniciar en un puerto específico en Windows:
```powershell
$env:PORT=3001; npm start
```

---

## 🎨 Personalización Visual
El diseño se controla a través de `index.css` mediante variables CSS y el uso de la propiedad `backdrop-filter`. Para modificar los colores neón, ajusta las clases de Bootstrap personalizadas `.btn-info` y `.border-info`.
