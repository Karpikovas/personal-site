FROM node:22-bookworm-slim

ENV NODE_ENV=production

EXPOSE 3000
WORKDIR /app

# Системные пакеты и pnpm
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends bash curl tzdata; \
    ln -snf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo Europe/Moscow > /etc/timezone; \
    npm install -g pnpm@10.7.0; \
    rm -rf /var/lib/apt/lists/*

# Копируем файлы для установки зависимостей
COPY package.json pnpm-lock.yaml ./
# Устанавливаем зависимости
RUN pnpm install --frozen-lockfile

# Копируем остальной код (включая source, next.config.ts и т.д.)
COPY . .

# Принимаем аргумент для ключа Server Actions
ARG NEXT_SERVER_ACTIONS_ENCRYPTION_KEY
ENV NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY

# (Опционально) генерируем importmap Payload, если нужно
RUN pnpm run payload:generate:importmap || true

# Собираем Next.js – это создаст папку .next
RUN pnpm run build

# Копируем entrypoint (он больше не будет запускать сборку)
COPY deploy/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["pnpm", "start"]
