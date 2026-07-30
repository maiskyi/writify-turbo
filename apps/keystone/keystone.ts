import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaPg } from '@prisma/adapter-pg'
// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core'

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema'

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth'

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'postgresql',
      prismaClientOptions: () => ({
        adapter: new PrismaPg({
          connectionString: process.env.WRITIFY_DATABASE_URL!
        }),
        log: ['warn', 'error'],
      }),
      async onConnect(context) {
        // this creates an initial user if none exist so you can log in for development
        // WARNING: do not use this in production
        ;(async () => {
          const sudoContext = context.sudo()
          if ((await sudoContext.db.User.count()) !== 0) return

          await sudoContext.db.User.createOne({
            data: { name: process.env.KEYSTONE_ADMIN_NAME!, email: process.env.KEYSTONE_ADMIN_USER!, password: process.env.KEYSTONE_ADMIN_PASSWORD! },
          })
          console.log(`Created initial user: ${process.env.KEYSTONE_ADMIN_USER!}`)
        })().catch(error => console.error('Failed to create initial user:', error))
      },
    },
    apolloConfig: {
      plugins: [
        {
          async requestDidStart(requestContext) {
            console.log(
              'graphql operation',
              requestContext.request.operationName ?? '(unnamed operation)'
            )
            return {
              async didEncounterErrors(requestContext) {
                console.error(...requestContext.errors)
              },
            }
          },
        },
      ],
    },
    lists,
    session,
  })
)
