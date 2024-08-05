import { Elysia } from 'elysia'
import swagger from '@elysiajs/swagger'
import cors from '@elysiajs/cors'

import { CardsController } from '@/modules/cards/cards-controller'

import packageJson from '../package.json'
import { BattleController } from './modules/battle/battle-controller'

async function run() {
  const app = new Elysia()
    .use(cors())
    .use(swagger({
      path: '/docs',
      exclude: ['/docs', '/docs/json'],
      documentation: {
        info: {
          title: 'Pokemon Cards API',
          version: packageJson.version,
        },
        tags: [
          { name: 'Cards', description: 'Operations related to Pokemon Cards' },
          { name: 'Battle', description: 'Battles and simulations' },
        ],
      },
    }))
    .onError(({ code, error, path, headers, body }) => {
      // Log all the error details to the console for debugging
      console.error({
        error: {
          path,
          headers,
          body,
          code,
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      })

      const messages = {
        VALIDATION: 'Invalid request',
        UNAUTHORIZED: 'Unauthorized',
        FORBIDDEN: 'Forbidden',
        NOT_FOUND: 'Not found',
        METHOD_NOT_ALLOWED: 'Method not allowed',
        CONFLICT: 'Conflict',
        INTERNAL_SERVER_ERROR: 'Internal server error',
      }

      return {
        // Do not expose the error details to the client
        error: messages[code as keyof typeof messages] ?? 'Unknown error',
      }
    })
    .use(new CardsController().routes())
    .use(new BattleController().routes())
    .listen(process.env.PORT || 3000)

  console.log(`API is running on port ${app.server?.port}`)
}

void run()
