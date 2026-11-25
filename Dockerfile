FROM node:24.22.2 AS builder

WORKDIR /app/frontend
ENV NODE_ENV=production

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --include=dev

COPY archives/ /app/archives/
COPY frontend/index.html frontend/prerender.ts frontend/tsconfig.json frontend/vite.config.ts ./
COPY frontend/app/ app/
COPY frontend/public/ public/
RUN npm run build

################################################################################
FROM nginx:1.30.7-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/frontend/dist /var/www/phperkaigi/2025/code-battle-archive

EXPOSE 80
