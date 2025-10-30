FROM node:22-slim AS base

# Этап сборки
FROM base AS builder

RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN mkdir -p "$PNPM_HOME"

RUN pnpm add -g turbo

WORKDIR /app
COPY . .
RUN turbo prune web --docker

# Этап установки и сборки
FROM base AS installer

# ⚠️ ВАЖНО: снова устанавливаем pnpm здесь!
RUN npm install -g pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN mkdir -p "$PNPM_HOME"

# turbo не обязателен на этом этапе, если не вызываешь turbo run
# RUN pnpm add -g turbo

WORKDIR /app

COPY --from=builder /app/out/json/ .
# Копируем pnpm-lock.yaml из out/json (а не из /app/)
COPY --from=builder /app/out/json/pnpm-lock.yaml ./
# 🔑 КОПИРУЕМ КОРНЕВОЙ package.json — это важно!
COPY --from=builder /app/package.json ./
RUN pnpm install

COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build

# Финальный этап — запуск
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nextjs && \
    adduser --system --uid 1001 --gid 1001 nextjs

USER nextjs
COPY --from=installer --chown=nextjs:nextjs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nextjs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nextjs /app/apps/web/public ./apps/web/public

CMD ["node", "apps/web/server.js"]
