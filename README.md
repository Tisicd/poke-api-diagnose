# ⚡ Poke List App

Aplicación full-stack para buscar y visualizar Pokémon consumiendo la PokéAPI con autenticación JWT.

## 🏗️ Arquitectura

- **Backend**: Node.js + Express + Axios + PostgreSQL + JWT
- **Frontend**: React + Vite
- **Database**: PostgreSQL
- **Contenedores**: Docker + Docker Compose

## 📁 Estructura del Proyecto

```
poke-list-app/
├── backend/
│   ├── controllers/  # Controladores para auth, search, pokemon
│   ├── routes/       # Rutas de la API
│   ├── services/     # Servicios de negocio
│   ├── middleware/   # Middleware de autenticación JWT
│   └── db/           # Configuración de PostgreSQL
├── frontend/         # Aplicación React con Vite
│   ├── src/
│   │   ├── components/  # LoginPage, PokemonDashboard, PokemonCard
│   │   ├── services/     # AuthService, SearchService
│   │   └── api/          # Clientes API
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
- Backend: http://localhost:4000
  - Auth API: POST `/api/auth/login`
  - Search API: GET `/api/search?q=pokemon_name` (requiere JWT)
  - Pokemons API: GET `/api/pokemons` (legacy)
- PostgreSQL: localhost:5432

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

Las variables de entorno se configuran en `docker-compose.yml`:

```env
DB_HOST=database
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=pokemons
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion
PORT=4000
```

## 🛠️ Tecnologías

- **Backend**: Node.js, Express, Axios, PostgreSQL, JWT, bcryptjs
- **Frontend**: React, Vite, Axios
- **Database**: PostgreSQL 15
- **Containerización**: Docker, Docker Compose

## ✅ Funcionalidades

- ✅ Sistema de autenticación con JWT
- ✅ Búsqueda de Pokémon por nombre (backend search)
- ✅ Guardado de historial de búsquedas en PostgreSQL
- ✅ Tarjetas de Pokémon con descripciones (derecha y abajo)
- ✅ Interfaz moderna con Login Page y Dashboard
- ✅ Arquitectura separada frontend/backend
- ✅ Configuración Docker lista para producción

## 🔐 Credenciales de Prueba

Al iniciar la aplicación por primera vez, se crea automáticamente un usuario de prueba:
- **Usuario**: `admin`
- **Contraseña**: `admin123`

## 🐳 Despliegue con Docker Hub

### Usar imágenes pre-construidas

Las imágenes Docker están disponibles en Docker Hub. Para usarlas:

1. Crea un archivo `.env.prod`:
```env
DOCKER_HUB_USERNAME=tu-usuario-dockerhub
DB_USER=postgres
DB_PASSWORD=tu-password-seguro
DB_NAME=pokemons
JWT_SECRET=tu-secreto-jwt-super-seguro
BACKEND_PORT=4000
FRONTEND_PORT=5173
DB_PORT=5432
```

2. Ejecuta con docker-compose de producción:
```bash
# Cargar variables de entorno
export $(cat .env.prod | xargs)

# Ejecutar
docker-compose -f docker-compose.prod.yml up -d
```

### Imágenes disponibles

- `tu-usuario/poke-api-backend:latest`
- `tu-usuario/poke-api-frontend:latest`

## 🔄 CI/CD con GitHub Actions

El proyecto incluye GitHub Actions que automáticamente:

- ✅ Construyen las imágenes Docker en cada push a `main`/`master`
- ✅ Publican las imágenes en Docker Hub
- ✅ Usan caché para builds más rápidos
- ✅ Soportan tags semánticos (v1.0.0)

### Configuración

1. **Configura secrets en GitHub:**
   - `DOCKER_HUB_USERNAME`: Tu usuario de Docker Hub
   - `DOCKER_HUB_TOKEN`: Access token de Docker Hub

2. **Los workflows se ejecutan automáticamente** en cada push

Ver `GITHUB_SETUP.md` para instrucciones detalladas.

## 📝 Registro de Usuarios

La aplicación ahora incluye funcionalidad de registro:

- ✅ Los usuarios pueden crear cuentas nuevas
- ✅ Validación de usuario único
- ✅ Validación de contraseñas (mínimo 6 caracteres)
- ✅ Autenticación automática después del registro
- ✅ Cada usuario tiene su propio historial de búsquedas

