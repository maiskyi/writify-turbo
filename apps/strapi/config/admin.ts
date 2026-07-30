import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('STRAPI_ADMIN_JWT_SECRET')!,
  },
  apiToken: {
    salt: env('STRAPI_API_TOKEN_SALT')!,
  },
  transfer: {
    token: {
      salt: env('STRAPI_TRANSFER_TOKEN_SALT')!,
    },
  },
  secrets: {
    encryptionKey: env('STRAPI_ENCRYPTION_KEY')!,
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
});

export default config;
