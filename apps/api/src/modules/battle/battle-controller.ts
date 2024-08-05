import Elysia, { t } from 'elysia'
import { CardsRepository } from '@cookunity-challenge/core/cards'
import { CardsRepositoryImpl } from '../cards/cards-repository'

export class BattleController {
  async simulate({ repository, params }: {
    repository: CardsRepository
    params: { card: string, contrincant: string }
  }) {
    const [card, contrincant] = await Promise.all([
      repository.findOne(params.card),
      repository.findOne(params.contrincant),
    ])

    return {
      data: {
        succeed: card.wouldWinAgainst(contrincant),
      },
    }
  }

  routes() {
    return new Elysia()
      .decorate('repository', new CardsRepositoryImpl())
      .group(
        '/battle',
        { detail: { tags: ['Battle'] } },
        app => app
          .get('/simulate/:card/:contrincant', this.simulate, {
            detail: {
              description: 'Simulate a battle between two cards',
            },
            params: t.Object({
              card: t.String({
                description: 'ID of the card to simulate the battle with',
              }),
              contrincant: t.String({
                description: 'ID of the contrincant card',
              }),
            }),
            response: t.Object({
              data: t.Object({
                succeed: t.Boolean(),
              }),
            }, {
              description: 'The result of the battle',
            }),
          }),

      )
  }
}
