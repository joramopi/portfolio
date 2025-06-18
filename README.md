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
3. Crea un archivo `.env` (puedes usar `backend/.env.example` como referencia) y define las variables descritas más abajo.

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
- `DB_FILE` – Ruta al archivo SQLite. Por defecto `./database.sqlite`.

### Frontend

El archivo `frontend/.env` define la variable `VITE_API_URL`, que indica la URL
base para las peticiones al API. Por defecto debe apuntar al backend en
desarrollo:

```env
VITE_API_URL=http://localhost:3000/api
```

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
