'use client'

import { Card } from '@cookunity-challenge/core/cards'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useServerAction } from '@/lib/hooks/use-server-action'
import { simulate } from '@/api/battle/simulate'
import { useState } from 'react'

export function BattleSimulator({
  cardId,
  contrincants,
}: {
  cardId: string
  contrincants: Card[]
}) {
  const { data, execute } = useServerAction(simulate)
  const [contrincant, setContrincant] = useState(contrincants[0].id)

  return (
    <div className="w-full max-w-[500px]">
      <Select value={contrincant} onValueChange={setContrincant}>
        <SelectTrigger className="h-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {contrincants.map(card => (
            <SelectItem key={card.id} value={card.id}>
              <div className="h-16 flex gap-2">
                <div className="h-full aspect-square overflow-hidden rounded-lg bg-neutral-300 shadow-card">
                  <img src={card.image} alt={card.name} className={cn('object-cover', card.shiny && 'hue-rotate-180')} />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex gap-1">
                    <span className="font-bold">
                      #
                      {card.number}
                    </span>
                    <span className="font-bold">{card.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <span>
                      {card.hp}
                      {' '}
                      HP
                    </span>
                    <span>
                      {card.attack}
                      {' '}
                      Attack
                    </span>
                  </div>

                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        onClick={() => execute(cardId, contrincant)}
        className="w-full mt-4 p-4 text-white text-2xl font-bold bg-gradient-to-br from-red-600 to-red-500 rounded-md"
      >
        Battle!
      </button>
      <div className="w-full mt-4 flex justify-center items-center">
        {data && (
          <p className={data.succeed ? 'text-green-700' : 'text-red-700'}>{data.succeed ? 'You won!' : 'You lost!'}</p>
        )}
      </div>
    </div>
  )
}
