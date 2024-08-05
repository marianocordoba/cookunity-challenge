export const rarities = ['common', 'uncommon', 'rare'] as const

export type PokemonRarity = typeof rarities[number]
