import { Card } from '../entities/card'

export interface CardsRepository {
  findAll(): Promise<Card[]>

  findOne(id: string): Promise<Card>

  create(data: Omit<Card, 'id' | 'wouldWinAgainst'>): Promise<Card>

  update(id: string, data: Partial<Omit<Card, 'id'>>): Promise<Card>

  delete(id: string): Promise<Card>

  swot(id: string): Promise<{
    weak: Card[]
    resistant: Card[]
  }>
}
