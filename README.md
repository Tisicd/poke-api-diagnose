# ⚡ Poke List App

Aplicación full-stack para listar Pokémon consumiendo la PokéAPI.

## 🏗️ Arquitectura

- **Backend**: Node.js + Express + Axios + SQLite
- **Frontend**: React + Vite
- **Database**: SQLite
- **Contenedores**: Docker + Docker Compose

## 📁 Estructura del Proyecto

```
poke-list-app/
├── backend/          # API REST con Express
├── frontend/         # Aplicación React con Vite
├── database/         # Base de datos SQLite (se crea automáticamente)
├── docker-compose.yml
└── README.md
```

## 🚀 Instalación y Ejecución

### Opción 1: Docker Compose (Recomendado)

```bash
# Construir y levantar los contenedores
docker-compose build
docker-compose up

# Para ejecutar en segundo plano
docker-compose up -d

# Para detener
docker-compose down
```

**URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000/api/pokemons

### Opción 2: Desarrollo Local

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Exponer con Ngrok

Para exponer el backend públicamente:

1. Instala ngrok: https://ngrok.com/download

2. Ejecuta ngrok:
```bash
ngrok http 4000
```

3. Copia la URL pública (ej: `https://abc123.ngrok.io`)

4. Actualiza `frontend/src/api/pokemonApi.js`:
```js
const BASE_URL = "https://abc123.ngrok.io/api/pokemons";
```

5. Reconstruye el frontend si usas Docker:
```bash
docker-compose up --build frontend
```

## 📦 Variables de Entorno

**Backend** (`.env`):
```env
PORT=4000
```

## 🛠️ Tecnologías

- **Backend**: Node.js, Express, Axios, SQLite
- **Frontend**: React, Vite, Axios
- **Containerización**: Docker, Docker Compose

## ✅ Funcionalidades

- ✅ Listar los primeros 10 Pokémon desde la PokéAPI
- ✅ Mostrar nombre e imagen de cada Pokémon
- ✅ Interfaz responsive con grid layout
- ✅ Arquitectura separada frontend/backend
- ✅ Configuración Docker lista para producción

