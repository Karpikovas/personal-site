FROM node:22-bookworm-slim

ENV NODE_ENV=production

EXPOSE 3000
WORKDIR /app

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends bash curl tzdata; \
    ln -snf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo Europe/Moscow > /etc/timezone; \
    npm install -g pnpm@10.7.0; \
    rm -rf /var/lib/apt/lists/*

COPY deploy/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["pnpm", "start"]

COPY . .

RUN pnpm install --frozen-lockfile
