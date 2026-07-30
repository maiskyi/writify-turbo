import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  url: env('STRAPI_URL', 'http://cms.writify.localhost'),
  app: {
    keys: env.array('STRAPI_APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('STRAPI_WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
