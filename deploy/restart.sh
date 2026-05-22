#!/bin/bash
set -eux

# Собираем новый образ
./deploy/build.sh

# Останавливаем и удаляем старый контейнер
./deploy/stop.sh

# Запускаем новый контейнер (первый запуск пересоберёт Next.js)
./deploy/start.sh
