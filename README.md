Для работы проекта нужно запустить базу данных и объектное хранилище.

Frontend: http://localhost:3000

Для продакшн-версии:
# Production mode
docker compose up --build -d
Создаётся база данных Postgres, объектное хранилище MinIO, фронтенд на Next.js и бэкенд на NestJS — всё в Docker.

Для режима разработки:
## Development mode
docker compose -f docker-compose.dev.yml up --build -d
Запускает только Postgres и MinIO (без фронтенда и бэкенда в контейнерах).

Установка зависимостей:
pnpm i

Применение миграций:
cd apps/api
pnpm migration

(Опционально) Заполнение базы тестовыми данными:
pnpm seed

Возврат в корень проекта:
cd ../..

Запуск dev-серверов (фронтенд + бэкенд):
pnpm dev

Очистка dev-окружения (удаляет контейнеры, образы и данные):
## Delete all containers
docker compose -f docker-compose.dev.yml down --rmi all --volumes