'use client'

export default function HomePageError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <main className="p-8 mx-auto md:container">
      <header className="mb-8 flex flex-col gap-4 md:flex-row">
        <h1 className="text-2xl font-bold">Pokemon App</h1>
      </header>
      <div className="w-full p-4 bg-red-100 text-red-800 border border-red-300 rounded-lg">
        {error.message}
        <span
          role="button"
          className="block text-red-600 rounded-md"
          onClick={reset}
        >
          Click here to retry
        </span>
      </div>
    </main>
  )
}
