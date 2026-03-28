# 🎬 Cine Digital - Sistema de Gestión de Medios (Producción)

![Estado del Proyecto](https://img.shields.io/badge/Estado-Producción-green?style=for-the-badge)
![Tecnología](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb&logoColor=white)

Cine Digital es una plataforma FullStack robusta diseñada para la gestión organizada de catálogos de películas y series. Este proyecto ha sido desarrollado bajo estándares de **Arquitectura Senior de Software**, garantizando escalabilidad, mantenibilidad y una separación clara entre las capas de negocio.

---

## 🚀 Despliegue en la Nube

La aplicación se encuentra actualmente en producción y puede ser accedida a través de los siguientes enlaces:

- **🌐 Frontend (React):** [https://cine-digital-frontend.vercel.app](https://cine-digital-frontend.vercel.app)
- **⚙️ Backend (API REST):** [https://cine-digital-backend.onrender.com](https://cine-digital-backend.onrender.com)
- **🗄️ Base de Datos:** MongoDB Atlas (Cluster Distribuido)

---

## 🏛️ Arquitectura del Sistema

El proyecto sigue un modelo de **Arquitectura Desacoplada** con los siguientes componentes:

1.  **Frontend (UI):** Desarrollado en **ReactJS**, implementando Hooks para la gestión de estados y Axios para el consumo de servicios REST.
2.  **Backend (API):** Construido sobre **Node.js** y **Express**, siguiendo el patrón Controlador-Modelo para una lógica de negocio limpia.
3.  **Persistencia:** Utilización de **Mongoose** como ODM para interactuar con **MongoDB Atlas**.
4.  **Gestión de Archivos:** Sistema automatizado de subida de imágenes (Multer) integrado en el backend.

---

## ✨ Funcionalidades Destacadas

- **Auto-Generación de Seriales:** El sistema calcula automáticamente el siguiente código serial disponible (Ej: M001, M002...) eliminando el error humano.
- **CRUD Completo:** Gestión total de Géneros, Directores, Productoras, Tipos de Medio y Películas.
- **Seguridad en Producción:** Configuración de CORS con orígenes dinámicos y protección de variables de entorno mediante archivos `.env`.
- **Diseño Glassmorphism:** Interfaz moderna y responsiva con efectos de transparencia y micro-animaciones.

---

## 🛠️ Tecnologías y Herramientas

- **Frontend:** React 19, React Router 5, Axios, Bootstrap 5, SweetAlert2.
- **Backend:** Node.js, Express, Multer, Cors, Dotenv.
- **Despliegue:** GitHub (Control de Versiones), Vercel (Frontend CI/CD), Render (Backend).

---

## 📂 Estructura del Proyecto

```text
/
├── backend/          # API REST, Controladores, Modelos y Rutas
├── frontend/         # React App, Componentes UI, Servicios y Páginas
├── screenshots/      # Documentación visual del despliegue
└── README.md         # Documentación principal del sistema
```

---

## 👤 Autor
**Juan Diego Calle** - *Desarrollador FullStack*

---
© 2026 Cine Digital - Proyecto Académico de Ingeniería de Software.
