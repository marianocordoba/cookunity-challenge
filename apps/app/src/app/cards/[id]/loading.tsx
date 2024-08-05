export default async function CardDetailPageLoading() {
  return (
    <main className="p-8 mx-auto md:container">
      <header className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="h-10 w-48 bg-neutral-300 animate-pulse rounded-lg" />
      </header>
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-[500px] aspect-[2.5/3.5] rounded-xl bg-neutral-300 overflow-hidden shadow-card animate-pulse" />
        <div className="w-32 h-32 flex items-center justify-center bg-red-600 text-white text-4xl font-bold rounded-full">
          <span className="-skew-x-[30deg]">VS</span>
        </div>
        <div className="relative w-full max-w-[500px] h-48 rounded-xl bg-neutral-300 overflow-hidden shadow-card animate-pulse" />
      </div>
    </main>
  )
}
