# ⚙️ Cine Digital - Backend API

Esta es la API RESTful que sustenta la lógica de negocio y la persistencia de datos para el sistema Cine Digital.

---

## 📡 Arquitectura de la API

La API se basa en el patrón **Controlador-Ruta** y expone los siguientes recursos bajo la ruta base `/api`:

### Endpoints Disponibles

| Recurso | Ruta | Métodos | Descripción |
| :--- | :--- | :--- | :--- |
| **Géneros** | `/api/genero` | `GET`, `POST`, `PUT` | Clasificación cinematográfica. |
| **Directores** | `/api/director` | `GET`, `POST`, `PUT` | Registro de directores de cine. |
| **Productoras** | `/api/productora` | `GET`, `POST`, `PUT` | Empresas de producción. |
| **Tipos** | `/api/tipo` | `GET`, `POST`, `PUT` | (ej. Película, Serie). |
| **Media** | `/api/media` | `GET`, `POST`, `PUT`, `DELETE` | Catálogo de contenidos. |

---

## 📦 Modelos de Datos (Mongoose)

Cada modelo cuenta con validaciones integradas:
- **Media**: Serial Único, Título, Sinopsis, URL, Imagen (String), Año Estreno y relaciones Populated con los otros maestros.
- **Género/Director/Productora**: Nombres, Estado (Activo/Inactivo) y fechas de auditoría.

---

## 🔑 Configuración del Entorno

Debes crear un archivo `.env` en el directorio `/backend` con los siguientes parámetros:

```env
PORT=4001
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/test
```

> [!TIP]
> Si el puerto 4000 está ocupado en tu sistema (muy común con WSL), usa el 4001 como se indica arriba.

---

## 🛠️ Scripts de Ejecución
- `npm start`: Ejecución normal con Node.js.
- `npm run dev`: Ejecución en desarrollo con **nodemon** (auto-reload).

---

## 🖼️ Gestión de Imágenes
Las imágenes se procesan mediante **Multer** y se almacenan en la carpeta `/uploads`. La API sirve estos archivos estáticamente en `http://localhost:PORT/uploads/nombre-archivo.jpg`.
