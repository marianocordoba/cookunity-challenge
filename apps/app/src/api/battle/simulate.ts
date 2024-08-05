export async function simulate(cardId: string, contrincantId: string):
Promise<{ data?: { succeed: boolean }, error?: never } | { data?: never, error: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/battle/simulate/${cardId}/${contrincantId}`)
  return await res.json()
}
