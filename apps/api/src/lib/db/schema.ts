import { integer, pgEnum, pgTable, uuid, varchar, boolean } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import { EvolutionStage, PokemonRarity, PokemonType, rarities, stages, types } from '@cookunity-challenge/core/cards'

export const rarityEnum = pgEnum('rarity', rarities)
export const typeEnum = pgEnum('type', types)
export const stageEnum = pgEnum('stage', stages)

export const card = pgTable('cards', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  number: integer('number').notNull(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  image: varchar('image').notNull(),
  type: typeEnum('type').notNull().$type<PokemonType>(),
  hp: integer('hp').notNull(),
  attack: integer('attack').notNull(),
  rarity: rarityEnum('rarity').notNull().$type<PokemonRarity>(),
  stage: stageEnum('stage').notNull().default('basic').$type<EvolutionStage>(),
  weakness: typeEnum('weakness').$type<PokemonType | null>(),
  resistance: typeEnum('resistance').$type<PokemonType | null>(),
  shiny: boolean('shiny').notNull().default(false),
  foil: boolean('foil').notNull().default(false),
})
