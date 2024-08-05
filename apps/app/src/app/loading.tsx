export default async function HomePageLoading() {
  return (
    <main className="p-8 mx-auto md:container">
      <header className="mb-8 flex flex-col gap-4 md:flex-row">
        <h1 className="text-2xl font-bold">Pokemon App</h1>
      </header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {new Array(8).fill(0).map((_, index) => (
          <div key={index} className="relative w-full aspect-[2.5/3.5] rounded-xl bg-neutral-300 overflow-hidden shadow-card animate-pulse" />
        ))}
      </div>
    </main>
  )
}
