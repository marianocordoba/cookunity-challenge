import { Service } from 'typedi'
import { Card, CardsRepository } from '@cookunity-challenge/core/cards'

import db from '@/lib/db'
import { asc, desc, eq } from 'drizzle-orm'

@Service()
export class CardsRepositoryImpl implements CardsRepository {
  async findAll(): Promise<Card[]> {
    const results = await db
      .select()
      .from(db.schema.card)
      .orderBy(desc(db.schema.card.foil), asc(db.schema.card.number), desc(db.schema.card.shiny))

    return results.map(card => new Card(card))
  }

  async findOne(id: string): Promise<Card> {
    const [card] = await db
      .select()
      .from(db.schema.card)
      .where(eq(db.schema.card.id, id))
      .limit(1)

    return new Card(card)
  }

  async create(data: Omit<Card, 'id'>): Promise<Card> {
    const [card] = await db
      .insert(db.schema.card)
      .values(data)
      .returning()

    return new Card(card)
  }

  async update(id: string, data: any): Promise<Card> {
    const [card] = await db
      .update(db.schema.card)
      .set(data)
      .where(eq(db.schema.card.id, id))
      .returning()

    return new Card(card)
  }

  async delete(id: string): Promise<Card> {
    const [card] = await db
      .delete(db.schema.card)
      .where(eq(db.schema.card.id, id))
      .returning()

    return new Card(card)
  }

  async swot(id: string): Promise<{ weak: Card[], resistant: Card[] }> {
    const card = await this.findOne(id)

    const [weak, resistant] = await Promise.all([
      db
        .select()
        .from(db.schema.card)
        .where(eq(db.schema.card.weakness, card.type))
        .orderBy(asc(db.schema.card.number)),
      db
        .select()
        .from(db.schema.card)
        .where(eq(db.schema.card.resistance, card.type))
        .orderBy(asc(db.schema.card.number)),
    ])

    return {
      weak: weak.map(card => new Card(card)),
      resistant: resistant.map(card => new Card(card)),
    }
  }
}
