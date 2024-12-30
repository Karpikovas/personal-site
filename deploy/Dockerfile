FROM node:22.4.1-alpine3.20

ENV NODE_ENV=production

EXPOSE 3000
WORKDIR /app

RUN set -eux; \
  \
  apk add --update --no-cache tzdata; \
  ln -snf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo Europe/Moscow > /etc/timezone; \
  \
  npm install -g pnpm; \
  \
  rm -rf /var/cache/apk/*

COPY deploy/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["pnpm", "start"]

COPY . .

RUN set -eux; \
  \
  pnpm install; \
  \
  pnpm build
