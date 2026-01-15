# Medical Booking — Nuxt 3

Медицинское веб-приложение для записи на консультации к врачам. Реализованы основные экраны из ТЗ: список врачей с фильтрами, страница врача, отзывы и модальное окно записи на прием, а также форма авторизации.

## Стек

- Nuxt 3 + SSR
- TypeScript
- Pinia

## Быстрый старт

```bash
npm install
npm run dev
```

Приложение будет доступно на `http://localhost:3000`.

## Описание API (mock)

В проекте есть моковые эндпоинты Nuxt server API:

- `GET /api/doctors` — список врачей с фильтрами, сортировкой и пагинацией
- `GET /api/specialties` — список специальностей
- `GET /api/doctors/{id}` — информация о враче
- `GET /api/doctors/{id}/schedule` — расписание врача
- `GET /api/doctors/{id}/reviews` — отзывы с сортировкой и пагинацией
- `POST /api/auth/login` — авторизация
- `GET /api/auth/me` — данные пользователя (требует токен)
- `POST /api/appointments` — создание записи (FormData, требует авторизации)
