import './index.css'

function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl md:text-6xl font-bold tracking-wide">
        Aksi Lestari Website
      </h1>

      <p className="mt-4 text-lg md:text-xl font-medium text-[var(--color-secondary)] max-w-md">
        Mewujudkan lingkungan yang lestari melalui aksi nyata dan berkelanjutan.
      </p>
      
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          className="px-6 py-3 rounded-xl bg-[var(--color-primary)] text-[var(--color-white)] font-semibold shadow-md hover:opacity-95 transition-opacity"
        >
          Mulai Aksi
        </button>
      </div>
    </main>
  )
}

export default App