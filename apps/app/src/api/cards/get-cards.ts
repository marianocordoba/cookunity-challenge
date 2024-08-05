import { Card } from '@cookunity-challenge/core/cards'

export async function getCards() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`)
  return await res.json() as { data?: Card[], error?: string }
}
