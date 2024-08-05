import db from '@/lib/db'
import { Card } from '@cookunity-challenge/core/cards'

async function run() {
  const data: Omit<Card, 'id' | 'wouldWinAgainst'>[] = [{
    number: 6,
    name: 'Lucario',
    description: 'It\'s said that no foe can remain invisible to Lucario, since it can detect auras—even those of foes it could not otherwise see.',
    image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/448.png',
    type: 'fighting',
    hp: 90,
    attack: 30,
    rarity: 'rare',
    stage: 'stage1',
    weakness: 'psychic',
    resistance: null,
    shiny: false,
    foil: false,
  }, {
    number: 10,
    name: 'Mismagius',
    description: 'Its cry sounds like an incantation. It is said the cry may rarely be imbued with happiness-giving power.',
    image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/429.png',
    type: 'psychic',
    hp: 90,
    attack: 30,
    rarity: 'rare',
    stage: 'stage1',
    weakness: 'dark',
    resistance: 'normal',
    shiny: false,
    foil: false,
  }, {
    number: 11,
    name: 'Palkia',
    description: 'It has the ability to distort space. It is described as a deity in Sinnoh-region mythology.',
    image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/484.png',
    type: 'psychic',
    hp: 90,
    attack: 40,
    rarity: 'rare',
    stage: 'basic',
    weakness: 'electric',
    resistance: null,
    shiny: false,
    foil: true,
  }, {
    number: 53,
    name: 'Machoke',
    description: 'Its muscular body is so powerful, it must wear a power-save belt to be able to regulate its motions.',
    image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/067.png',
    type: 'fighting',
    hp: 80,
    attack: 40,
    rarity: 'uncommon',
    stage: 'stage1',
    weakness: 'psychic',
    resistance: null,
    shiny: false,
    foil: false,
  }, {
    number: 94,
    name: 'Ponyta',
    description: 'About an hour after birth, Ponyta\'s fiery mane and tail grow out, giving the Pokémon an impressive appearance.',
    image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/077.png',
    type: 'fire',
    hp: 60,
    attack: 10,
    rarity: 'common',
    stage: 'basic',
    weakness: 'water',
    resistance: null,
    shiny: false,
    foil: false,
  }, {
    number: 92,
    name: 'Onix',
    description: 'As it digs through the ground, it absorbs many hard objects. This is what makes its body so solid.',
    image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/095.png',
    type: 'rock',
    hp: 90,
    attack: 20,
    rarity: 'common',
    stage: 'basic',
    weakness: 'water',
    resistance: 'electric',
    shiny: false,
    foil: false,
  }, {
    number: 1,
    name: 'Dialga',
    description: 'It has the power to control time. It appears in Sinnoh-region myths as an ancient deity.',
    image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/483.png',
    type: 'steel',
    hp: 90,
    attack: 40,
    rarity: 'rare',
    stage: 'basic',
    weakness: 'fire',
    resistance: 'psychic',
    shiny: false,
    foil: true,
  }, {
    number: 34,
    name: 'Noctowl',
    description: 'Its eyes are specially adapted. They concentrate even faint light and enable it to see in the dark.',
    image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/164.png',
    type: 'normal',
    hp: 90,
    attack: 30,
    rarity: 'rare',
    stage: 'stage1',
    weakness: 'electric',
    resistance: 'fighting',
    shiny: false,
    foil: false,
  }, {
    number: 27,
    name: 'Gengar',
    description: 'To steal the life of its target, it slips into the prey’s shadow and silently waits for an opportunity.',
    image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/094.png',
    type: 'ghost',
    hp: 110,
    attack: 30,
    rarity: 'rare',
    stage: 'stage2',
    weakness: 'dark',
    resistance: 'normal',
    shiny: false,
    foil: false,
  }]

  await db.transaction(async (trx) => {
    for (const card of data) {
      await trx
        .insert(db.schema.card)
        .values(card)
    }
  })
}

run()
  .then(() => {
    console.log('Seeded cards')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed to seed cards:', error)
    process.exit(1)
  })
