import { getCards } from '@/api/cards/get-cards'
import { TradingCard } from '@/components/TradingCard'
import Link from 'next/link'

export default async function HomePage() {
  const { data, error } = await getCards()

  if (error) {
    throw new Error(error)
  }

  return (
    <main className="p-8 mx-auto md:container">
      <header className="mb-8 flex flex-col gap-4 md:flex-row">
        <h1 className="text-2xl font-bold">Pokemon App</h1>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {data!.map(card => (
          <Link key={card.id} href={`/cards/${card.id}`}>
            <TradingCard card={card} />
          </Link>
        ))}
      </div>
    </main>
  )
}
