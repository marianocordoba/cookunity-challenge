import { PokemonRarity } from './rarities'
import { EvolutionStage } from './stages'
import { PokemonType } from './types'

export class Card {
  id: string
  number: number
  name: string
  description: string
  image: string
  type: PokemonType
  hp: number
  attack: number
  rarity: PokemonRarity
  stage: EvolutionStage
  weakness: PokemonType | null
  resistance: PokemonType | null
  shiny: boolean
  foil: boolean

  constructor(values: {
    id: string
    number: number
    name: string
    description: string
    image: string
    type: PokemonType
    hp: number
    attack: number
    rarity: PokemonRarity
    stage: EvolutionStage
    weakness: PokemonType | null
    resistance: PokemonType | null
    shiny: boolean
    foil: boolean
  }) {
    this.id = values.id
    this.number = values.number
    this.name = values.name
    this.description = values.description
    this.image = values.image
    this.type = values.type
    this.hp = values.hp
    this.attack = values.attack
    this.rarity = values.rarity
    this.stage = values.stage
    this.weakness = values.weakness
    this.resistance = values.resistance
    this.shiny = values.shiny
    this.foil = values.foil
  }

  /**
   * @description Check if the card would win against the contrincant
   * in one attack
   *
   * @param contrincant The card to fight against
   *
   * @returns {boolean} If the card would win against the contrincant
   *
   * @example
   * const card = new Card({
   *  attack: 50,
   *  type: 'fire',
   *  // ...
   * })
   *
   * const weakContrincant = new Card({
   *   hp: 80,
   *   weakness: 'fire',
   *   // ...
   * })
   *
   * const strongContrincant = new Card({
   *   hp: 40,
   *   resistance: 'fire',
   *   // ...
   * })
   *
   * card.wouldWinAgainst(weakContrincant) // true
   * // The attack is doubled because the contrincant is weak to fire
   * // 50 * 2 = 100 >= 80
   *
   * card.wouldWinAgainst(strongContrincant) // false
   * // The attack is reduced by 20 because the contrincant has resistance to fire
   * // 50 - 20 = 30 < 40
   */
  wouldWinAgainst(contrincant: Card): boolean {
    let cardAttack = this.attack

    if (contrincant.weakness === this.type) {
      cardAttack *= 2
    }

    if (contrincant.resistance === this.type) {
      cardAttack -= 20
    }

    return cardAttack >= contrincant.hp
  }
}
