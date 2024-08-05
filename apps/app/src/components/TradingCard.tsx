import { Card, PokemonType } from '@cookunity-challenge/core/cards'

import { cn } from '@/lib/utils'

const typeColors: Record<PokemonType, string> = {
  fire: 'from-orange-500 to-orange-700',
  water: 'from-blue-500 to-blue-700',
  electric: 'from-yellow-500 to-yellow-700',
  grass: 'from-green-500 to-green-700',
  ice: 'from-blue-300 to-blue-500',
  fighting: 'from-red-500 to-red-700',
  poison: 'from-purple-500 to-purple-700',
  ground: 'from-yellow-700 to-yellow-900',
  flying: 'from-blue-300 to-blue-500',
  psychic: 'from-purple-500 to-purple-700',
  bug: 'from-green-500 to-green-700',
  rock: 'from-yellow-700 to-yellow-900',
  ghost: 'from-purple-500 to-purple-700',
  dragon: 'from-blue-500 to-blue-700',
  dark: 'from-gray-700 to-gray-900',
  steel: 'from-gray-300 to-gray-500',
  fairy: 'from-pink-500 to-pink-700',
  normal: 'from-gray-300 to-gray-500',
}

export function TradingCard({
  card,
}: {
  card: Card
}) {
  return (
    <div className={cn('relative w-full max-w-[500px] aspect-[2.5/3.5] rounded-xl bg-white overflow-hidden shadow-card', card.foil && 'border bg-gradient-to-br from-white via-neutral-300 to-white foil')}>
      <div className={cn('absolute w-[110%] h-56 -left-[5%] bg-gradient-to-br rounded-b-full', typeColors[card.type])} />
      <div className="relative h-full p-4 flex flex-col items-center">
        <div className="w-full flex justify-between">
          <div className="h-8 px-2 flex items-center gap-1 bg-white rounded-full">
            <span className="mt-0.5 text-xs">HP</span>
            <span className="font-semibold">{card.hp}</span>
          </div>
          <div className="px-2 py-1 flex flex-col items-center gap-2">
            <span className="font-semibold text-white text-xl uppercase tracking-wide">
              #
              {card.number.toString()}
            </span>
          </div>
          <div className="h-8 px-2 flex items-center gap-1 bg-white rounded-full">
            <span className="mt-0.5 text-xs">Attack</span>
            <span className="font-semibold">{card.attack}</span>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <span className="p-1 text-[0.5rem] leading-none tracking-wide text-white rounded-md uppercase">{card.stage}</span>
          <span className="p-1 text-[0.5rem] leading-none tracking-wide text-white rounded-md uppercase">{card.rarity}</span>
        </div>

        <img
          className={cn('w-2/3 mt-4 object-cover', card.shiny && 'hue-rotate-180 saturate-200')}
          src={card.image}
          alt={card.name}
        />

        <div className="flex-1">
          <h2 className="flex items-center justify-center gap-1 text-lg font-bold uppercase">
            {card.name}
            <span className={cn('p-1 text-[0.5rem] leading-none text-white tracking-wide bg-gradient-to-br rounded-md', typeColors[card.type])}>{card.type}</span>
            {card.shiny && (
              <span className="p-1 text-[0.5rem] leading-none text-white tracking-wide bg-neutral-900 rounded-md">Shiny</span>
            )}
          </h2>
          <p className="text-sm text-gray-500">{card.description}</p>
        </div>
        <div className="w-full flex justify-between">
          <div className="px-2 py-1 flex flex-col items-center gap-1">
            <span className="mt-0.5 text-xs">Weakness</span>
            <span className={cn(
              'p-1 text-[0.5rem] leading-none text-white tracking-wide bg-gradient-to-br rounded-md uppercase',
              card.weakness ? typeColors[card.weakness] : 'from-transparent to-transparent text-black',
            )}
            >
              {card.weakness ?? '-'}
            </span>
          </div>
          <div className="px-2 py-1 flex flex-col items-center gap-1">
            <span className="mt-0.5 text-xs">Resistance</span>
            <span className={cn(
              'p-1 text-[0.5rem] leading-none text-white tracking-wide bg-gradient-to-br rounded-md uppercase',
              card.resistance ? typeColors[card.resistance] : 'from-transparent to-transparent text-black',
            )}
            >
              {card.resistance ?? '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
