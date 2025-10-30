# apps/api/Dockerfile
FROM node:22-slim AS base

# Установка pnpm
RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# === Этап сборки ===
FROM base AS builder
WORKDIR /app

# Копируем всё: исходники, конфиги, shared-пакеты
COPY . .

# Устанавливаем все зависимости (включая workspace и dev)
RUN pnpm install

# Собираем бэкенд
WORKDIR /app/apps/api
RUN pnpm run build:docker

# Проверяем, что dist создан
RUN ls -la dist/

# === Финальный образ ===
FROM base AS runner
WORKDIR /app

# Создаём непривилегированного пользователя
RUN addgroup --system --gid 1001 nestjs && \
    adduser --system --uid 1001 nestjs

# 1. Создаём чистый package.json (только production-зависимости)
COPY --from=builder /app/apps/api/package.json ./original.json
RUN node -e " \
  const pkg = require('./original.json'); \
  const clean = { \
    name: pkg.name, \
    version: pkg.version, \
    main: 'dist/main.js', \
    dependencies: pkg.dependencies || {} \
  }; \
  require('fs').writeFileSync('package.json', JSON.stringify(clean, null, 2)); \
"

# 2. Устанавливаем production-зависимости
RUN pnpm install --prod

# 3. Копируем скомпилированный код И исходники (для nestjs-trpc)
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/src ./src

# Переключаемся на непривилегированного пользователя
USER nestjs

# Запуск
CMD ["node", "dist/main"]