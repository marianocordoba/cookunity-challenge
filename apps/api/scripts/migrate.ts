import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

import config from '../drizzle.config'

async function run() {
  const sql = postgres(process.env.DATABASE_URL, { max: 1 })
  const db = drizzle(sql)

  await migrate(db, { migrationsFolder: config.out ?? 'migrations' })

  await sql.end()
}

void run()
