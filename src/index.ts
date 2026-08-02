import type { Core } from '@strapi/strapi';

// Публічні (без автентифікації) API, які повинен читати фронтенд:
// стрічка новин та календар подій.
const PUBLIC_READ_APIS: Record<string, string[]> = {
  'api::news-item.news-item': ['find', 'findOne'],
  'api::event.event': ['find', 'findOne'],
};

async function grantPublicReadPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  for (const [uid, actions] of Object.entries(PUBLIC_READ_APIS)) {
    for (const action of actions) {
      const actionId = `${uid}.${action}`;
      const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: { action: actionId, role: publicRole.id },
      });

      if (!existing) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: { action: actionId, role: publicRole.id },
        });
      }
    }
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await grantPublicReadPermissions(strapi);
  },
};
