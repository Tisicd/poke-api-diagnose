# 🚀 Guía: Subir Proyecto a GitHub y Docker Hub

Esta guía te ayudará a subir tu proyecto a GitHub y configurar GitHub Actions para construir y publicar automáticamente las imágenes Docker en Docker Hub.

## 📋 Prerequisitos

1. Cuenta de GitHub
2. Cuenta de Docker Hub
3. Git instalado localmente
4. Docker instalado (opcional, para pruebas locales)

## 🔧 Paso 1: Configurar Docker Hub

### 1.1 Crear cuenta en Docker Hub

Si no tienes cuenta, créala en: https://hub.docker.com/

### 1.2 Crear Access Token

1. Ve a Docker Hub → Account Settings → Security
2. Clic en "New Access Token"
3. Nombre: `github-actions` (o el que prefieras)
4. Permisos: **Read & Write**
5. Copia el token generado (solo se muestra una vez)

## 📦 Paso 2: Subir Proyecto a GitHub

### 2.1 Crear repositorio en GitHub

1. Ve a GitHub y crea un nuevo repositorio
2. Nombre: `poke-api-diagnose` (o el que prefieras)
3. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
4. Elige si será público o privado

### 2.2 Inicializar Git localmente

```bash
# Si aún no has inicializado git
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit: Pokemon API with authentication and registration"

# Agregar el remoto de GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/poke-api-diagnose.git

# Cambiar a branch main (si estás en master)
git branch -M main

# Subir el código
git push -u origin main
```

## 🔐 Paso 3: Configurar Secrets en GitHub

### 3.1 Agregar Secrets

1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Clic en "New repository secret"
4. Agrega estos secrets:

**Secret 1:**
- Name: `DOCKER_HUB_USERNAME`
- Value: Tu nombre de usuario de Docker Hub

**Secret 2:**
- Name: `DOCKER_HUB_TOKEN`
- Value: El access token que creaste en el Paso 1.2

## 🎯 Paso 4: Verificar GitHub Actions

### 4.1 Workflows disponibles

Hay dos workflows disponibles:

1. **`docker-build-push-simple.yml`** (Recomendado para empezar)
   - Más simple
   - Construye y publica en cada push a main/master
   - Tags: `latest` y `sha`

2. **`docker-build-push.yml`** (Avanzado)
   - Más completo
   - Soporta tags semánticos (v1.0.0)
   - Soporta branches y PRs
   - Mejor para proyectos más grandes

### 4.2 Activar el workflow

1. Los workflows ya están en `.github/workflows/`
2. Se activarán automáticamente cuando hagas push a `main` o `master`
3. Puedes ver el progreso en: Actions → Workflows

### 4.3 Probar manualmente

Puedes ejecutar el workflow manualmente:
1. Ve a Actions
2. Selecciona "Build and Push Docker Images"
3. Clic en "Run workflow"
4. Selecciona la rama y ejecuta

## 🐳 Paso 5: Usar las imágenes de Docker Hub

### 5.1 Crear archivo .env para producción

Crea un archivo `.env.prod` (no lo subas a Git):

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

### 5.2 Usar docker-compose.prod.yml

```bash
# Cargar variables de entorno
export $(cat .env.prod | xargs)

# O en Windows PowerShell:
# Get-Content .env.prod | ForEach-Object { if ($_ -match '^([^=]+)=(.*)$') { [Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process') } }

# Ejecutar con docker-compose de producción
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 Paso 6: Actualizar README

Actualiza el README.md con información sobre:

- Cómo obtener las imágenes de Docker Hub
- Variables de entorno necesarias
- Instrucciones de despliegue

## 🔒 Seguridad: Evitar Exposición de Código

### Opciones:

1. **Repositorio Privado** (Recomendado)
   - Haz el repositorio privado en GitHub
   - Solo las imágenes estarán públicas en Docker Hub
   - El código fuente permanece privado

2. **Usar Secrets para todo**
   - Todas las credenciales en GitHub Secrets
   - No hardcodear passwords en el código
   - Usar variables de entorno

3. **Docker Hub con repositorios privados**
   - Docker Hub ofrece repositorios privados (plan pago)
   - O usar otros registries privados (GitHub Container Registry, AWS ECR, etc.)

## 🚀 Comandos Útiles

### Ver logs de GitHub Actions
```bash
# En GitHub: Actions → Selecciona el workflow → Ver logs
```

### Verificar imágenes en Docker Hub
```bash
# Ver tus imágenes
docker pull tu-usuario/poke-api-backend:latest
docker pull tu-usuario/poke-api-frontend:latest
```

### Tags y versiones
```bash
# Crear un tag para nueva versión
git tag v1.0.0
git push origin v1.0.0

# Esto activará el workflow y creará imágenes con tag v1.0.0
```

## ⚠️ Troubleshooting

### Error: "Docker Hub login failed"
- Verifica que los secrets estén correctamente configurados
- Asegúrate de que el token tenga permisos Read & Write

### Error: "Image not found"
- Espera a que el workflow termine de construir
- Verifica que el nombre de usuario en secrets coincida con Docker Hub

### Las imágenes no se actualizan
- Verifica que estés usando `:latest` o el tag correcto
- Puede haber caché, usa `docker pull` para forzar actualización

## 📚 Recursos Adicionales

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [Docker Buildx](https://docs.docker.com/buildx/)

