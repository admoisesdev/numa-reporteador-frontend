# --- Etapa 1: Construcción ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
COPY . .


RUN pnpm run build

# Verificación (opcional, para debug)
RUN ls -la /app/build/client

# --- Etapa 2: Producción ---
FROM nginx:alpine
# Copia desde la ubicación exacta del build
COPY --from=builder /app/build/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]