import { authDecoder } from '@redwoodjs/auth-auth0-api'
import { createAuthDecoder } from '@redwoodjs/auth-dbauth-api'
import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { cookieName, getCurrentUser, userMetadata } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const authDecoderDb = createAuthDecoder(cookieName)

export const handler = createGraphQLHandler({
  authDecoder,
  authDecoderDb,
  allowGraphiQL: false,
  defaultError: 'Sorry. We effed up. Check logs if you are an admin',
  getCurrentUser,
  userMetadata,
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
