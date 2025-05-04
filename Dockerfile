# --- Etapa 1: Construcción ---
FROM node:20-alpine AS builder

WORKDIR /app

# Configura pnpm primero
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json pnpm-lock.yaml ./

# Instala dependencias con cache
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copia el resto de los archivos
COPY . .

RUN pnpm run build

# --- Etapa 2: Producción ---
FROM nginx:alpine

# Configuración de Nginx optimizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia solo los archivos built
COPY --from=builder --chown=nginx:nginx /app/build/client /usr/share/nginx/html

# Asegura que Nginx tenga permisos de escritura para logs
RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chmod -R 755 /var/log/nginx

# Salud del contenedor
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]