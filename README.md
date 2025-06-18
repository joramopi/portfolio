# Portafolio Academico

Este repositorio contiene dos proyectos independientes:

- **backend/** – API en Node.js.
- **frontend/** – Aplicación web en React.

A continuación se describen los pasos de instalación, las variables de entorno y cómo poner en marcha ambos proyectos en modo desarrollo.

## Requisitos previos

- [Node.js](https://nodejs.org/) y npm instalados en el sistema.

## Instalación

### Backend

1. Accede al directorio `backend`:

   ```bash
   cd backend
   ```
2. Instala las dependencias:

   ```bash
   npm install
   ```
3. Crea un archivo `.env` (puedes usar `backend/.env` como ejemplo) y define las variables descritas más abajo.

### Frontend

1. Accede al directorio `frontend`:

   ```bash
   cd frontend
   ```
2. Instala las dependencias:

   ```bash
   npm install
   ```

## Variables de entorno

### Backend

Las siguientes variables se leen desde el archivo `.env` en el directorio `backend`:

- `PORT` – Puerto en el que se iniciará el servidor. Por defecto `3000`.
- `JWT_SECRET` – Clave secreta para firmar los tokens JWT.
- `MONGO_URI` – URL de conexión a la base de datos MongoDB. Si no se define se usa `mongodb://localhost:27017/portfolio`.

### Frontend

La aplicación frontend no requiere variables de entorno adicionales por defecto.

## Ejecución en modo desarrollo

### Backend

Desde el directorio `backend` ejecuta:

```bash
npm run dev
```

El servidor quedará escuchando en el puerto indicado por la variable `PORT`.

### Frontend

Desde el directorio `frontend` ejecuta:

```bash
npm run dev
```

Vite iniciará la aplicación y la servirá normalmente en `http://localhost:5173`.

---
