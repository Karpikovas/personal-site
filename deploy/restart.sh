#!/bin/bash
set -eux

# Собираем новый образ
./deploy/build.sh

# Останавливаем и удаляем старый контейнер
./deploy/stop.sh

# Удаляем volume со старой сборкой Next.js (БАЗА ДАННЫХ НЕ ТРОГАЕТСЯ!)
docker volume rm site_next_data

# Запускаем новый контейнер (первый запуск пересоберёт Next.js)
./deploy/start.sh
