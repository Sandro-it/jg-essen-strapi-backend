# Jüdische Gemeinde Essen — Strapi Backend

Strapi 5 (TypeScript) бекенд нового сайту Єврейської громади Ессена.

## Стек

- Strapi 5 + TypeScript
- SQLite для локальної розробки (за замовчуванням), PostgreSQL для прод (`DATABASE_CLIENT=postgres`)
- `@strapi/provider-upload-cloudinary` — зберігання медіафайлів (активується, коли задано `CLOUDINARY_NAME`)
- `@strapi/plugin-users-permissions` — авторизація для адмінів громади

## Розробка

```bash
npm install
cp .env.example .env   # заповніть секрети (APP_KEYS, JWT_SECRET тощо) та за потреби DB/Cloudinary
npm run develop
```

Адмінка: http://localhost:1337/admin

## Content-types

- **News** (`api::news-item.news-item`, `/api/news-items`) — title, date, text (richtext), mainImage,
  gallery, videoUrl. Основа архіву новин, записи не видаляються автоматично.
- **Event** (`api::event.event`, `/api/events`) — title, date, description, location. Календар подій.
- **Archive** (`api::archive.archive`, `/api/archives`) — title, type (document/photo/video), date, file,
  category (Gemeindezeitung/Veranstaltungen/Fotos-Filmen). Перенесені старі матеріали.

Публічний (без автентифікації) доступ на читання (`find`/`findOne`) для News та Event видається
автоматично при першому запуску (`src/index.ts`, bootstrap), щоб фронтенд міг показувати стрічку
новин і календар подій без авторизації.

## Продакшн

Деплой планується з PostgreSQL. Перед деплоєм задайте `DATABASE_CLIENT=postgres` та відповідні
`DATABASE_*` змінні, а також `CLOUDINARY_NAME` / `CLOUDINARY_KEY` / `CLOUDINARY_SECRET` для медіа.
