# --- Etapa 1: Construir dependencias de desarrollo ---
FROM node:20-alpine AS development-dependencies-env
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Etapa 2: Construir la aplicación ---
FROM node:20-alpine AS build-env
WORKDIR /app
COPY . .
COPY --from=development-dependencies-env /app/node_modules ./node_modules
RUN npm run build  # Genera la carpeta /app/build

# --- Etapa 3: Servir con Nginx ---
FROM nginx:alpine AS production
COPY --from=build-env /app/build /usr/share/nginx/html
# Config para React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]