import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://jg-essen-frontend.vercel.app',
        // Vercel branch-preview alias (стабільний для гілки layout-compact,
        // оновлюється автоматично при кожному новому пуші в цю гілку).
        'https://jg-essen-frontend-git-layout-compact-sandro-its-projects.vercel.app',
        'http://localhost:5173',
        'http://localhost:3000',
      ],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
