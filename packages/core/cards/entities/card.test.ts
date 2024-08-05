import { describe, test, expect } from 'bun:test'
import { Card } from './card'

describe('Card', () => {
  test('should not win agains a card with more hp and no weaknesses', () => {
    const card = new Card({
      id: '1',
      number: 1,
      name: '',
      description: '',
      image: '',
      type: 'normal',
      hp: 20,
      attack: 10,
      rarity: 'common',
      stage: 'basic',
      weakness: null,
      resistance: null,
      shiny: false,
      foil: false,
    })

    const contrincant = new Card({
      id: '1',
      number: 1,
      name: '',
      description: '',
      image: '',
      type: 'normal',
      hp: 20,
      attack: 10,
      rarity: 'common',
      stage: 'basic',
      weakness: null,
      resistance: null,
      shiny: false,
      foil: false,
    })

    expect(card.wouldWinAgainst(contrincant)).toBe(false)
  })

  test('should win agains a card with less or equal hp and no weaknesses', () => {
    const card = new Card({
      id: '1',
      number: 1,
      name: '',
      description: '',
      image: '',
      type: 'normal',
      hp: 20,
      attack: 10,
      rarity: 'common',
      stage: 'basic',
      weakness: null,
      resistance: null,
      shiny: false,
      foil: false,
    })

    const contrincant = new Card({
      id: '1',
      number: 1,
      name: '',
      description: '',
      image: '',
      type: 'normal',
      hp: 10,
      attack: 10,
      rarity: 'common',
      stage: 'basic',
      weakness: null,
      resistance: null,
      shiny: false,
      foil: false,
    })

    expect(card.wouldWinAgainst(contrincant)).toBe(true)
  })

  test('should win agains a card with a weakness', () => {
    const card = new Card({
      id: '1',
      number: 1,
      name: '',
      description: '',
      image: '',
      type: 'fire',
      hp: 20,
      attack: 10,
      rarity: 'common',
      stage: 'basic',
      weakness: 'water',
      resistance: null,
      shiny: false,
      foil: false,
    })

    const contrincant = new Card({
      id: '1',
      number: 1,
      name: '',
      description: '',
      image: '',
      type: 'water',
      hp: 20,
      attack: 10,
      rarity: 'common',
      stage: 'basic',
      weakness: 'fire',
      resistance: null,
      shiny: false,
      foil: false,
    })

    expect(card.wouldWinAgainst(contrincant)).toBe(true)
  })

  test('should not win agains a card with a resistance', () => {
    const card = new Card({
      id: '1',
      number: 1,
      name: '',
      description: '',
      image: '',
      type: 'fire',
      hp: 20,
      attack: 10,
      rarity: 'common',
      stage: 'basic',
      weakness: 'water',
      resistance: 'fire',
      shiny: false,
      foil: false,
    })

    const contrincant = new Card({
      id: '1',
      number: 1,
      name: '',
      description: '',
      image: '',
      type: 'fire',
      hp: 20,
      attack: 10,
      rarity: 'common',
      stage: 'basic',
      weakness: 'water',
      resistance: 'fire',
      shiny: false,
      foil: false,
    })

    expect(card.wouldWinAgainst(contrincant)).toBe(false)
  })

  test('should still win agains a card with resistance but low hp', () => {
    const card = new Card({
      id: '1',
      number: 1,
      name: '',
      description: '',
      image: '',
      type: 'fire',
      hp: 20,
      attack: 30,
      rarity: 'common',
      stage: 'basic',
      weakness: 'water',
      resistance: 'grass',
      shiny: false,
      foil: false,
    })

    const contrincant = new Card({
      id: '1',
      number: 1,
      name: '',
      description: '',
      image: '',
      type: 'water',
      hp: 20,
      attack: 10,
      rarity: 'common',
      stage: 'basic',
      weakness: 'fire',
      resistance: 'grass',
      shiny: false,
      foil: false,
    })

    expect(card.wouldWinAgainst(contrincant)).toBe(true)
  })
})
