import postgres from 'postgres'
import { type PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'

import * as schema from './schema'

export type DatabaseWithSchema = PostgresJsDatabase<typeof schema> & {
  schema: typeof schema
}

const client = postgres(process.env.DATABASE_URL)

export const db: DatabaseWithSchema = drizzle(client, {
  schema,
}) as DatabaseWithSchema

db.schema = schema
