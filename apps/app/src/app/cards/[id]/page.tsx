import { getCard } from '@/api/cards/get-card'
import { getCards } from '@/api/cards/get-cards'
import { TradingCard } from '@/components/TradingCard'

import { BattleSimulator } from './battle-simulator'

export default async function CardDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const [{ data: card, error: cardError }, { data: cards, error: cardsError }] = await Promise.all([
    getCard(params.id),
    getCards(),
  ])

  if (cardError ?? cardsError) {
    throw new Error(cardError ?? cardsError)
  }

  const contrincants = cards!.filter(c => c.id !== card!.id)

  return (
    <main className="p-8 mx-auto md:container">
      <header className="mb-8 flex flex-col gap-4 md:flex-row">
        <h1 className="text-2xl font-bold">{card!.name}</h1>
      </header>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <TradingCard card={card!} />
        <div className="w-32 h-32 flex items-center justify-center bg-red-600 text-white text-4xl font-bold rounded-full">
          <span className="-skew-x-[30deg]">VS</span>
        </div>
        <BattleSimulator cardId={card!.id} contrincants={contrincants} />
      </div>
    </main>
  )
}
