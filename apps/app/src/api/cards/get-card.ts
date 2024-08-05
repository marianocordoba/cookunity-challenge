import { Card } from '@cookunity-challenge/core/cards'

export async function getCard(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards/${id}`)
  return await res.json() as { data?: Card, error?: string }
}
