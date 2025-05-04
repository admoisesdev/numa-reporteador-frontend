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
COPY --from=builder /app/build/client /usr/share/nginx/html

# Configuración de seguridad y performance
RUN \
    # Elimina la página por defecto
    rm -rf /usr/share/nginx/html/*.html && \
    # Habilita compresión gzip
    echo "gzip on;" >> /etc/nginx/conf.d/default.conf && \
    echo "gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;" >> /etc/nginx/conf.d/default.conf && \
    # Configura cache para assets estáticos
    sed -i '/location \/ {/a \    expires 1y;\n    add_header Cache-Control "public";' /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]