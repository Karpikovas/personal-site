FROM node:22.4.1-alpine3.20

ENV NODE_ENV=development

EXPOSE 3000
WORKDIR /app

RUN set -eux; \
  apk add --update --no-cache bash curl tzdata; \
  ln -snf /usr/share/zoneinfo/Europe/Moscow /etc/localtime && echo Europe/Moscow > /etc/timezone; \
  npm install -g pnpm@10.7.0; \
  rm -rf /var/cache/apk/*

COPY develop/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

COPY . .
