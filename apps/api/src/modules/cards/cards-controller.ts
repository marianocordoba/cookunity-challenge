import Elysia, { t } from 'elysia'
import { Card, CardsRepository, rarities, types } from '@cookunity-challenge/core/cards'

import { CardsRepositoryImpl } from './cards-repository'

export class CardsController {
  async index({ repository }: {
    repository: CardsRepository
  }) {
    const cards = await repository.findAll()

    return {
      data: cards,
    }
  }

  async show({ repository, params }: {
    repository: CardsRepository
    params: { id: string }
  }) {
    const card = await repository.findOne(params.id)

    return {
      data: card,
    }
  }

  async swot({ repository, params }: {
    repository: CardsRepository
    params: { id: string }
  }) {
    const result = await repository.swot(params.id)

    return {
      data: result,
    }
  }

  async create({ repository, body }: {
    repository: CardsRepository
    body: Omit<Card, 'id' | 'wouldWinAgainst'>
  }) {
    const card = await repository.create(body)

    return {
      data: card,
    }
  }

  async update({ repository, params, body }: {
    repository: CardsRepository
    params: { id: string }
    body: Partial<Omit<Card, 'id'>>
  }) {
    const card = await repository.update(params.id, body)

    return {
      data: card,
    }
  }

  async delete({ repository, params }: {
    repository: CardsRepository
    params: { id: string }
  }) {
    const card = await repository.delete(params.id)

    return {
      data: card,
    }
  }

  routes() {
    // This should be `t.String({ enum: types })`, but Elysia
    // does not support enums yet.
    // @see https://github.com/elysiajs/elysia/issues/512

    // Also mapping `types` to `t.Literal` (`types.map(type => t.Literal(type))`)
    // doesn't work.
    const typeSchema = t.Union([
      t.Literal('normal'),
      t.Literal('fire'),
      t.Literal('water'),
      t.Literal('electric'),
      t.Literal('grass'),
      t.Literal('ice'),
      t.Literal('fighting'),
      t.Literal('poison'),
      t.Literal('ground'),
      t.Literal('flying'),
      t.Literal('psychic'),
      t.Literal('bug'),
      t.Literal('rock'),
      t.Literal('ghost'),
      t.Literal('dark'),
      t.Literal('dragon'),
      t.Literal('steel'),
      t.Literal('fairy'),
    ])

    const raritySchema = t.Union([
      t.Literal('common'),
      t.Literal('uncommon'),
      t.Literal('rare'),
    ])

    const stageSchema = t.Union([
      t.Literal('basic'),
      t.Literal('stage1'),
      t.Literal('stage2'),
    ])

    const cardSchema = t.Object({
      id: t.String(),
      number: t.Number(),
      name: t.String(),
      description: t.String(),
      image: t.String(),
      type: typeSchema,
      hp: t.Number(),
      attack: t.Number(),
      rarity: raritySchema,
      stage: stageSchema,
      weakness: t.Nullable(typeSchema),
      resistance: t.Nullable(typeSchema),
      shiny: t.Boolean(),
      foil: t.Boolean(),
    })

    return new Elysia()
      .decorate('repository', new CardsRepositoryImpl())
      .group(
        '/cards',
        { detail: { tags: ['Cards'] } },
        app => app
          .get('/', this.index, {
            detail: {
              description: 'List all cards',
            },
            response: t.Object({
              data: t.Array(cardSchema),
            }, {
              description: 'List of cards',
            }),
          })
          .get('/:id', this.show, {
            detail: {
              description: 'Get card details',
            },
            params: t.Object({
              id: t.String({
                description: 'The ID of the card to show',
              }),
            }),
            response: t.Object({
              data: cardSchema,
            }, {
              description: 'Card details',
            }),
          })
          .get('/:id/swot', this.swot, {
            detail: {
              description: 'Get cards that are weak or strong against the card',
            },
            params: t.Object({
              id: t.String({
                description: 'The ID of the card to search for',
              }),
            }),
            response: t.Object({
              data: t.Object({
                weak: t.Array(cardSchema),
                resistant: t.Array(cardSchema),
              }),
            }, {
              description: 'Cards that are weak or strong against the card',
            }),
          })
          .post('/', this.create, {
            detail: {
              description: 'Creates a new card',
            },
            body: t.Omit(cardSchema, ['id']),
            response: t.Object({
              data: cardSchema,
            }, {
              description: 'Created card',
            }),
          })
          .put('/:id', this.update, {
            detail: {
              description: 'Updates a card',
            },
            params: t.Object({
              id: t.String({
                description: 'The ID of the card to update',
              }),
            }),
            body: t.Partial(t.Omit(cardSchema, ['id'])),
            response: t.Object({
              data: cardSchema,
            }, {
              description: 'Updated card',
            }),
          })
          .delete('/:id', this.delete, {
            detail: {
              description: 'Deletes a card',
            },
            params: t.Object({
              id: t.String({
                description: 'The ID of the card to delete',
              }),
            }),
            response: t.Object({
              data: cardSchema,
            }, {
              description: 'Deleted card',
            }),
          }),
      )
  }
}
